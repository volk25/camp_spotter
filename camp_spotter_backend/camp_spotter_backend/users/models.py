# ======================================================================================================================
#
#                                                  Models module
#
# ======================================================================================================================

# This is the Models module of the Users app. The classes used for building the migrations are defined here.
# It is good to start building the app from this module.
# IMPORTANT: After modifying these, the migrations have to be recreated (the SQL database will be also generated).

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from django.db import models
from django.contrib.auth.models import AbstractUser

# ======================================================================================================================
#                              1. Data for constructing the database scheme and queries
# ======================================================================================================================


def user_image_upload_to(instance, user_image_filename):
    """
    Generate the string of the path for a newly uploaded image.
    Input:
    - instance: the user instance
    - user_image_filename: the image filename
    Output:
    - String with the path inside the media folder
    """
    return f'images/users/{user_image_filename}'


class User(AbstractUser):
    """
    Create the database fields to be filled in for each user.
    Please be aware that if ModelForm, ModelSerializer, ModelAdmin, etc... are used in the project, these will rely on
    this model.
    """

    pass

    image = models.ImageField(upload_to=user_image_upload_to, default='images/users/default.jpg')
    slug = models.SlugField(max_length=100, unique=True, null=True)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.username


