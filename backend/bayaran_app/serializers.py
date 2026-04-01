from rest_framework import serializers
from .models import Student, AttendanceRecord, PaymentRecord
from django.contrib.auth.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'section']

class AttendanceRecordSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.CharField(write_only=True)

    class Meta:
        model = AttendanceRecord
        fields = ['id', 'student', 'student_id', 'date', 'status']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        student = Student.objects.get(id=student_id)
        validated_data['student'] = student
        return super().create(validated_data)

class PaymentRecordSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.CharField(write_only=True)

    class Meta:
        model = PaymentRecord
        fields = ['id', 'student', 'student_id', 'date', 'amount', 'status']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        student = Student.objects.get(id=student_id)
        validated_data['student'] = student
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
