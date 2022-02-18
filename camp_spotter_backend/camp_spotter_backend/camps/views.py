# ======================================================================================================================
#
#                                                  Views module
#
# ======================================================================================================================

# This is the Views module of the Camps app.
# No View Sets will be used in this module.
# IMPORTANT: always route the triggering of these Classes.as_view() in the urls.py module!

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

# REST Framework views, responses, etc functionalities
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, DestroyAPIView

# REST Framework permissions and authentication functionalities
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# REST Framework parsers for image upload functionality
from rest_framework.parsers import MultiPartParser, FormParser

# Imports of custom defined functionalities
from .permissions import IsAuthor  # custom made permission class
from .models import Camp, Review
from django.contrib.auth import get_user_model
from .serializers import CampSerializer, ReviewSerializer

# ======================================================================================================================
#                     1. Camp displaying and editing views (class-based, generics, concrete)
# ======================================================================================================================


class CampListView(ListCreateAPIView):
    """
    Custom view class for camp list and create.
    Built from the Rest Framework concrete view ListCreateAPIView (http method behaviors should not be defined).
    Allows the user to retrieve the camp list (GET).
    """

    # Since the class is created from a concrete view class we need to define only the following
    queryset = Camp.objects.all()
    serializer_class = CampSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self, **kwargs):
        """
        Overrides the get_queryset method of the generic GenericAPIView and filter the queryset according to the user.
        """

        if self.kwargs.get('slug'):
            User = get_user_model()
            queryset = Camp.objects.all()
            related_user_object = User.objects.get(slug=self.kwargs.get('slug'))
            related_user_queryset = queryset.filter(author=related_user_object.pk)

            return related_user_queryset


class CampListCreateView(ListCreateAPIView):
    """
    Custom view class for camp list and create.
    Built from the Rest Framework concrete view ListCreateAPIView (http method behaviors should not be defined).
    Allows the user to retrieve the camp list (GET) or to add a camp (POST).
    """

    # Since the class is created from a concrete view class we need to define only the following
    queryset = Camp.objects.all()
    serializer_class = CampSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        """
        Overrides the perform_create method of the generic CreateModelMixin.
        """

        serializer.save(author=self.request.user)


class CampRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    Custom view class for the camp retrieve, edit and delete.
    Built from the Rest Framework concrete view RetrieveUpdateDestroyAPIView (http method behaviors should not
    be defined).
    Allows the user to retrieve the details of a camp (GET), edit a camp (PUT) or to delete a camp (DELETE).
    """

    # Since the class is created from a concrete view class we need to define only the following
    queryset = Camp.objects.all()
    lookup_field = 'slug'
    serializer_class = CampSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthor]


# ======================================================================================================================
#                    2. Review displaying and editing views (class-based, generics, concrete)
# ======================================================================================================================


class ReviewListCreateView(ListCreateAPIView):
    """
    Custom view class for review list and create.
    Built from the Rest Framework concrete view ListCreateAPIView (http method behaviors should not be defined).
    Allows the user to retrieve the review list (GET) or to add a review (POST).
    """

    # Since the class is created from a concrete view class we need to define only the following
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self, **kwargs):
        """
        Overrides the get_queryset method of the generic GenericAPIView.
        """

        queryset = Review.objects.all()
        related_camp_object = Camp.objects.get(slug=self.kwargs.get('slug'))
        related_camp_queryset = queryset.filter(camp=related_camp_object.pk)

        return related_camp_queryset

    def perform_create(self, serializer):
        """
        Overrides the perform_create method of the generic CreateModelMixin.
        """

        related_camp_object = Camp.objects.get(slug=self.kwargs.get('slug'))
        serializer.save(author=self.request.user, camp=related_camp_object)


class ReviewDestroyView(DestroyAPIView):
    """
    Custom view class for the review retrieve, edit and delete.
    Built from the Rest Framework concrete view DestroyAPIView (http method behaviors should not be defined).
    Allows the user to delete a review (DELETE).
    """

    # Since the class is created from a concrete view class we need to define only the following
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthor]