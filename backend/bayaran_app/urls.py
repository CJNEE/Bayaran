from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'students', views.StudentViewSet)
router.register(r'attendance', views.AttendanceRecordViewSet)
router.register(r'payments', views.PaymentRecordViewSet)
router.register(r'excel', views.ExcelUploadView, basename='excel')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login_view),
    path('register/', views.register_view),
]

