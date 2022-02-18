# ======================================================================================================================
#
#                                                   URLs module
#
# ======================================================================================================================

# This is the URLs module of the project. The URL patterns are defined here.
# IMPORTANT: the patterns specified here are meant to control the triggering of actions in views.py module!

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from camps.views import CampListCreateView, CampRetrieveUpdateDestroyView, ReviewListCreateView, ReviewDestroyView
from users.views import UserListCreateView, UserRetrieveUpdateDestroyView, TokenRetrieveDeleteView, IdentityRetrieveView

# ======================================================================================================================
#                                               1. URL patterns
# ======================================================================================================================

"""
In the following 'urlpatterns' list all the paths should be listed.
In the path function:
- 1st argument: URL
- 2nd argument: function in the views.py to be called
- 3rd argument: name of the page to be displayed 
Error 404 will be rendered if the inputted URL will not correspond to any of the defined in the paths.
"""

# Define the main URLs
urlpatterns = [

    # Admin functionalities (default)
    path('admin/', admin.site.urls, name='admin'),

    # REST Framework functionalities (default)
    path('api-auth/', include('rest_framework.urls')),  # this is just to add login functionality to the api-page

    # Users displaying, editing and authenticate functionalities
    path('users/', UserListCreateView.as_view(), name="user_list"),
    path('users/<slug:slug>/', UserRetrieveUpdateDestroyView.as_view(), name="user_details"),
    path('token/', TokenRetrieveDeleteView.as_view(), name="token"),
    path('identity/', IdentityRetrieveView.as_view(), name="identity"),

    # Camps (and Reviews) displaying and editing functionalities
    path('camps/', CampListCreateView.as_view(), name="camp_list"),
    path('camps/<slug:slug>/', CampRetrieveUpdateDestroyView.as_view(), name="camp_details"),
    path('camps/<slug:slug>/reviews/', ReviewListCreateView.as_view(), name="review_list"),
    path('camps/<slug:slug>/reviews/<int:pk>/', ReviewDestroyView.as_view(), name="review_delete"),

]

# Add the static url to the main URLs
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
