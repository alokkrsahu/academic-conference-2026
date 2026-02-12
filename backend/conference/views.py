
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Event, Room, Speaker, Session, Registration
from .serializers import (
    EventSerializer, RoomSerializer, SpeakerListSerializer, SpeakerDetailSerializer,
    SessionListSerializer, SessionDetailSerializer, RegistrationCreateSerializer, RegistrationSerializer
)

class EventView(APIView):
    def get(self, request):
        event = Event.objects.first()
        if not event:
            return Response({"detail": "No event found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event)
        return Response(serializer.data)

class RoomViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class SpeakerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Speaker.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SpeakerDetailSerializer
        return SpeakerListSerializer

class SessionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Session.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SessionDetailSerializer
        return SessionListSerializer

    def get_queryset(self):
        queryset = Session.objects.all()
        day = self.request.query_params.get('day')
        room = self.request.query_params.get('room')
        speaker = self.request.query_params.get('speaker')
        track = self.request.query_params.get('track')

        if day:
            queryset = queryset.filter(start_time__date=day)
        if room:
            queryset = queryset.filter(room_id=room)
        if speaker:
            queryset = queryset.filter(speakers__id=speaker)
        if track:
            queryset = queryset.filter(track__icontains=track)
            
        return queryset

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return RegistrationCreateSerializer
        return RegistrationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
