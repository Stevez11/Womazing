from django.urls import path
from .store.views import *

urlpatterns = [
    path('products/', get_products),
    path('products/<slug:category_slug>/', get_products),
    path('categories/', get_categories),
    path('products/<slug:product_slug>/<slug:color_slug>/', get_product),
]
