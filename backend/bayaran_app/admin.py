from django.contrib import admin
from .models import Student, AttendanceRecord, PaymentRecord

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'section']
    search_fields = ['id', 'name']
    list_filter = ['section']

@admin.register(AttendanceRecord)
class AttendanceRecordAdmin(admin.ModelAdmin):
    list_display = ['student', 'date', 'status']
    list_filter = ['status', 'date']
    search_fields = ['student__id', 'student__name']

@admin.register(PaymentRecord)
class PaymentRecordAdmin(admin.ModelAdmin):
    list_display = ['student', 'date', 'status', 'amount']
    list_filter = ['status', 'date']
    search_fields = ['student__id', 'student__name']

