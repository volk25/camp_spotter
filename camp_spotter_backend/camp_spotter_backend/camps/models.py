# ======================================================================================================================
#
#                                                  Models module
#
# ======================================================================================================================

# This is the Models module of the Camps app. The classes used for building the migrations are defined here.
# It is good to start building the app from this module.
# IMPORTANT: After modifying these, the migrations have to be recreated (the SQL database will be also generated).

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model

# ======================================================================================================================
#                              1. Data for constructing the database scheme and queries
# ======================================================================================================================


def camp_image_upload_to(instance, camp_image_filename):
    """
    Generate the string of the path for a newly uploaded image.
    Input:
    - instance: the camp instance
    - camp_image_filename: the image filename
    Output:
    - String with the path inside the media folder
    """
    return f'images/camps/{camp_image_filename}'


class Camp(models.Model):
    """
    Create the database fields to be filled in for each camp.
    Please be aware that if ModelForm, ModelSerializer, ModelAdmin, etc.. are used in the project, these will rely on
    this model.
    """

    # Define the general fields
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to=camp_image_upload_to, default='images/camps/default.jpg')
    main_body = models.TextField(max_length=3000)
    position_body = models.TextField(max_length=2000, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()

    # Define a Many-to-one relationship with the User object
    User = get_user_model()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='camps')

    # Define the fields to be filled in automatically
    slug = models.SlugField(max_length=250, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        Metadata of the model.
        """

        ordering = ['-created_on']

    # We want to see the title of the camp on the admin page
    def __str__(self):
        return self.title


class Review(models.Model):
    """
    Create the database fields to be filled in for the review of a camp.
    Please be aware that if ModelForm, ModelSerializer, ModelAdmin, etc.. are used in the project, these will rely on
    this model.
    """

    # Define the general fields
    title = models.CharField(max_length=200)
    body = models.TextField(max_length=500)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    # Define a Many-to-one relationship with the Camp object
    camp = models.ForeignKey(Camp, on_delete=models.CASCADE, related_name='reviews')

    # Define a Many-to-one relationship with the User object
    User = get_user_model()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')

    # Define the fields to be filled in automatically
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        Metadata of the model.
        """

        ordering = ['-created_on']

    # We want to see the title of the review on the admin page
    def __str__(self):
        return self.title