from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
    path("logout/", LogoutView.as_view(), name="logout"),
]
