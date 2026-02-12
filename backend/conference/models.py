
from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=255)
    address = models.CharField(max_length=512, blank=True)
    contact_email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Room(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField(null=True, blank=True)
    location_notes = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name

class Speaker(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    display_name = models.CharField(max_length=200, blank=True)
    title = models.CharField(max_length=200, blank=True)
    affiliation = models.CharField(max_length=200, blank=True)
    bio = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    photo = models.ImageField(upload_to='speakers/photos/', blank=True, null=True)
    website = models.URLField(blank=True)
    twitter = models.CharField(max_length=100, blank=True)
    linkedin = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return self.display_name or f"{self.first_name} {self.last_name}"

class Session(models.Model):
    title = models.CharField(max_length=300)
    abstract = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    room = models.ForeignKey(Room, null=True, blank=True, on_delete=models.SET_NULL)
    speakers = models.ManyToManyField(Speaker, blank=True, related_name='sessions')
    track = models.CharField(max_length=200, blank=True)
    is_keynote = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_time']

    def __str__(self):
        return self.title

class Registration(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    affiliation = models.CharField(max_length=255, blank=True)
    ticket_type = models.CharField(max_length=50, default='attendee')
    dietary_requirements = models.CharField(max_length=255, blank=True)
    sessions = models.ManyToManyField(Session, blank=True, related_name='registrations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} <{self.email}>"
