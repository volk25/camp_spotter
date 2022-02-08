# ======================================================================================================================
#
#                                                  Signals module
#
# ======================================================================================================================

# This is the Signals module of the Users app.

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.text import slugify
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

# ======================================================================================================================
#                                                   1. Signals
# ======================================================================================================================


@receiver(pre_save, sender=get_user_model())
def add_user_slug(sender, instance, *args, **kwargs):
    """
    Generate automatically a slug for each user based on its username.
    """

    if instance and not instance.slug:
        slug = slugify(instance.username)
        instance.slug = slug


@receiver(post_save, sender=get_user_model())
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """
    Generate automatically a token for each newly created user.
    As defined here https://www.django-rest-framework.org/api-guide/authentication/
    """

    if created:
        Token.objects.create(user=instance)