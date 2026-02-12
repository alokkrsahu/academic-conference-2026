
from rest_framework import serializers
from .models import Event, Room, Speaker, Session, Registration

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'capacity', 'location_notes']

class SpeakerListSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Speaker
        fields = ['id', 'display_name', 'title', 'affiliation', 'photo_url', 'first_name', 'last_name']

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
        return None

class SessionListSerializer(serializers.ModelSerializer):
    room_name = serializers.CharField(source='room.name', read_only=True)
    speaker_names = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = ['id', 'title', 'start_time', 'end_time', 'room_name', 'speaker_names', 'track', 'is_keynote']

    def get_speaker_names(self, obj):
        return [str(s) for s in obj.speakers.all()]

class SpeakerDetailSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    sessions = SessionListSerializer(many=True, read_only=True)

    class Meta:
        model = Speaker
        fields = '__all__'
        extra_fields = ['photo_url', 'sessions']

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
        return None

class SessionDetailSerializer(serializers.ModelSerializer):
    room_details = RoomSerializer(source='room', read_only=True)
    speakers_details = SpeakerListSerializer(source='speakers', many=True, read_only=True)

    class Meta:
        model = Session
        fields = '__all__'

class RegistrationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['full_name', 'email', 'affiliation', 'ticket_type', 'dietary_requirements', 'sessions']

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
