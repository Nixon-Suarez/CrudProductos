from django.urls import path, include, re_path
from rest_framework import routers
from products import views

router = routers.DefaultRouter()
router.register(r'categories', views.CategoriaViewSet)
router.register(r'products', views.ProductoViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)), 
    re_path('api/v1/login/', views.login, name='login'),
    re_path('api/v1/register/', views.register, name='register'),
]
# genera las rutas para el CRUD de tareas utilizando el router de Django REST Framework. Esto permitirá acceder a las operaciones de creación, lectura, actualización y eliminación de tareas a través de la URL base 'api/v1/tasks/'.