# ======================================================================================================================
#
#                                                  Signals module
#
# ======================================================================================================================

# This is the Signals module of the Camps app.

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Camp
from django.utils.text import slugify

# ======================================================================================================================
#                                                   1. Signals
# ======================================================================================================================


@receiver(pre_save, sender=Camp)
def add_camp_slug(sender, instance, *args, **kwargs):
    """
    Generate automatically a slug for each camp based on its username.
    """

    if instance and not instance.slug:
        slug = slugify(instance.title)
        instance.slug = slug

