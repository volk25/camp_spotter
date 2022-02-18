# ======================================================================================================================
#
#                                                  Views module
#
# ======================================================================================================================

# This is the Views module of the Users app.
# No View Sets will be used in this module.
# IMPORTANT: always route the triggering of these Classes.as_view() in the urls.py module!

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

# REST Framework views, responses, etc functionalities
from rest_framework import status  # used for specifying the status in the Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response  # render the response (instead of JsonResponse)

# REST Framework permissions and authentication functionalities
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated

# REST Framework parsers for image upload functionality
from rest_framework.parsers import MultiPartParser, FormParser

# Imports of custom defined functionalities
from .permissions import IsOwner  # custom made permission class
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserCreateUpdateSerializer

# ======================================================================================================================
#                      1. Users displaying and editing views (class-based, generics, concrete)
# ======================================================================================================================


class UserListCreateView(ListCreateAPIView):
    """
    Custom view class for user list and create.
    Built from the Rest Framework concrete view ListCreateAPIView (http method behaviors should not be defined).
    Allows the user to retrieve the user list (GET) or to add a user (POST).
    """

    # Since the class is created from a concrete view class we need to define only the following
    User = get_user_model()
    queryset = User.objects.all()
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        """
        Gets the right serializer class for the request method.
        Input:
        - None
        Output:
        - Correct serializer class
        """

        if self.request.method == 'GET':
            return UserSerializer
        return UserCreateUpdateSerializer


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    Custom view class for the user retrieve, edit and delete.
    Built from the Rest Framework generic APIView (http method behaviors should be defined).
    Allows the user to retrieve the details of a user (GET), edit a user (PUT) or to delete a user (DELETE).
    """

    # Since the class is created from a concrete view class we need to define only the following
    User = get_user_model()
    queryset = User.objects.all()
    lookup_field = 'slug'
    serializer_class = UserCreateUpdateSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]


# ======================================================================================================================
#                                   2. Token administration (class-based)
# ======================================================================================================================


class TokenRetrieveDeleteView(ObtainAuthToken):
    """
    Custom view class for obtaining/deleting the authentication token (existing/new) of a user.
    Built from the Rest Framework generic ObtainAuthToken (http method behaviors should be defined).
    Doesn't require a serializer.
    Allows the user to obtain a token (POST) or to delete the token (DELETE).
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Allows the user to retrieve an existing token or generate a new token.
        Input:
        - request: only POST request is accepted
        Output:
        - Deserializes the provided credentials identifying the user and outputs a json with the token (if the token has
          not been created yet, then the latter is created)
        """

        # Deserialize the user credentials data
        user_credentials_deserialized = self.serializer_class(data=request.data, context={'request': request})

        # If the deserialized user credentials are valid, define the user object and retrieve for it the token
        if user_credentials_deserialized.is_valid():
            user_object = user_credentials_deserialized.validated_data['user']
            token, created = Token.objects.get_or_create(user=user_object)
            response_data = {
                'id': user_object.pk,
                'username': user_object.username,
                'token': token.key
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        # If the deserialized user credentials are not valid, return the errors in a json response
        return Response(user_credentials_deserialized.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
        Allows the user to delete the token of a user.
        Please note: THIS IS NOT NATIVELY IN THE ObtainAuthToken CLASS.
        Input:
        - request: only DELETE request is accepted
        Output:
        - Deserializes the provided credentials identifying the user and deletes its token
        """

        # Deserialize the user credentials data
        user_credentials_deserialized = self.serializer_class(data=request.data, context={'request': request})

        # If the deserialized user credentials are valid, define the user object and delete its token
        if user_credentials_deserialized.is_valid():
            user_object = user_credentials_deserialized.validated_data['user']
            user_object.auth_token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        # If the deserialized user credentials are not valid, return the errors in a json response
        return Response(user_credentials_deserialized.errors, status=status.HTTP_400_BAD_REQUEST)


class IdentityRetrieveView(APIView):
    """
    Custom view class for obtaining user's own data based on the authentication token.
    Built from the Rest Framework APIView (http method behaviors should be defined).
    Doesn't require a serializer.
    Allows the user to obtain the identity of a user based on the provided token (POST).
    """

    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Allows the user to retrieve its own data based on the provided token.
        Input:
        - request: only POST request is accepted
        Output:
        - Returns the user's own data
        """

        # Get the current user object
        user_object = self.request.user

        # The image has still a relative path, therefore it should be converted to an absolute one
        image = request.build_absolute_uri(user_object.image.url)

        # Define the response data to be outputted and return the response
        response_data = {
            'id': user_object.id,
            'username': user_object.username,
            'image': image
        }
        return Response(response_data, status=status.HTTP_200_OK)













