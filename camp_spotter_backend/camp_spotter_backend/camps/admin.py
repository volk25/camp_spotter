# ======================================================================================================================
#
#                                                   Admin module
#
# ======================================================================================================================

# This is the Admin module of the Camp app. The functionalities of the Admin page are defined here.

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from django.contrib import admin
from .models import Camp, Review

# ======================================================================================================================
#                                    1. Models editable through the Admin page
# ======================================================================================================================


@admin.register(Camp)
class CampAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_on', 'author')
    date_hierarchy = 'created_on'
    search_fields = ('title', 'body')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_on', 'author')
    date_hierarchy = 'created_on'
    search_fields = ('title', 'body')