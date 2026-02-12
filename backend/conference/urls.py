
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventView, RoomViewSet, SpeakerViewSet, SessionViewSet, RegistrationViewSet

router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'speakers', SpeakerViewSet)
router.register(r'sessions', SessionViewSet)
router.register(r'registrations', RegistrationViewSet)

urlpatterns = [
    path('event/', EventView.as_view(), name='event-detail'),
    path('', include(router.urls)),
]
