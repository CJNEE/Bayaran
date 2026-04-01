from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
import pandas as pd
from io import BytesIO
from .models import Student, AttendanceRecord, PaymentRecord
from .serializers import StudentSerializer, AttendanceRecordSerializer, PaymentRecordSerializer, UserSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('id')
    serializer_class = StudentSerializer

class AttendanceRecordViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRecord.objects.all().order_by('-date')
    serializer_class = AttendanceRecordSerializer

class PaymentRecordViewSet(viewsets.ModelViewSet):
    queryset = PaymentRecord.objects.all().order_by('-date')
    serializer_class = PaymentRecordSerializer

@method_decorator(csrf_exempt, name='dispatch')
class ExcelUploadView(viewsets.ViewSet):
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['post'])
    def upload_students(self, request):
        file = request.FILES['file']
        df = pd.read_excel(file)
        created = 0
        for _, row in df.iterrows():
            student, created_new = Student.objects.get_or_create(
                id=str(row['id']),
                defaults={'name': str(row['name']), 'section': str(row.get('section', ''))}
            )
            if created_new:
                created += 1
        return Response({'created': created, 'total': len(df)})

    @action(detail=False, methods=['post'])
    def upload_attendance(self, request):
        file = request.FILES['file']
        df = pd.read_excel(file)
        created = 0
        for _, row in df.iterrows():
            student = Student.objects.get(id=str(row['id']))
            AttendanceRecord.objects.update_or_create(
                student=student,
                date=row['date'].date(),
                defaults={'status': str(row['status'])}
            )
            created += 1
        return Response({'processed': created})

    @action(detail=False, methods=['post'])
    def upload_payments(self, request):
        file = request.FILES['file']
        df = pd.read_excel(file)
        created = 0
        for _, row in df.iterrows():
            student = Student.objects.get(id=str(row['id']))
            PaymentRecord.objects.update_or_create(
                student=student,
                date=row['date'].date(),
                defaults={'amount': float(row.get('amount', 0)), 'status': str(row.get('status', 'Unpaid'))}
            )
            created += 1
        return Response({'processed': created})

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'key': token.key})
    return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({'key': token.key, 'message': 'User registered successfully'})
    return Response(serializer.errors, status=400)
