# ======================================================================================================================
#
#                                                Serializers module
#
# ======================================================================================================================

# This is the Serializers module of the Users app. These are meant to serialize/deserialize objects/jsons.

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model

# ======================================================================================================================
#                                              1. User serializers
# ======================================================================================================================


class UserSerializer(serializers.ModelSerializer):
    """
    Used for converting the User model into a serialized form, and the other way around.
    Built from the Rest Framework generic ModelSerializer (it builds the Serializer directly from the Model).
    """

    User = get_user_model()
    image = serializers.ImageField(default='images/users/default.jpg')
    email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all())])
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_joined = serializers.DateTimeField(read_only=True)

    class Meta:
        """
        Defines the data to be taken directly from the model.
        """

        User = get_user_model()
        model = User
        fields = ['id', 'username', 'image', 'email', 'slug', 'first_name', 'last_name', 'date_joined']


class UserCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Used for converting the User model into a serialized form for registration of a new user.
    Built from the Rest Framework generic ModelSerializer (it builds the Serializer directly from the Model).
    This serializer CREATES AND UPDATES AUTOMATICALLY the new user (this should not be done again in the view).
    """

    User = get_user_model()
    image = serializers.ImageField(default='images/users/default.jpg')
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all())])
    first_name = serializers.CharField(required=False, allow_null=True)
    last_name = serializers.CharField(required=False, allow_null=True)
    date_joined = serializers.DateTimeField(read_only=True)
    slug = serializers.SlugField(read_only=True)

    class Meta:
        """
        Defines the data to be taken directly from the model.
        """

        User = get_user_model()
        model = User
        fields = ['id', 'username', 'image', 'password', 'password2', 'slug', 'email', 'first_name', 'last_name',
                  'date_joined']

    def validate(self, attrs):
        """
        Overrides the validate method of generic Serializer class.
        """

        # Check if the password match, and if they don't, throw an error
        if attrs['password'] != attrs['password2']:
            error_message = {
                "password": "Password fields didn't match"
            }
            raise serializers.ValidationError(error_message)

        return attrs

    def create(self, validated_data):
        """
        Overrides the create method of generic ModelSerializer class.
        """

        # Create a new user object
        User = get_user_model()
        user_object = User.objects.create(
            username=validated_data['username'],
            image=validated_data['image'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        # Set the password to the user object and save it
        user_object.set_password(validated_data['password'])
        user_object.save()

        return user_object

    def update(self, instance, validated_data):
        """
        Overrides the update method of generic ModelSerializer class.
        """

        # Define the existing user object
        user_object = instance

        # Update the following fields of an existing user object
        user_object.email = validated_data['email']
        user_object.first_name = validated_data['first_name']
        user_object.last_name = validated_data['last_name']
        user_object.image = validated_data['image']

        # Set the password to the user object and save it
        user_object.set_password(validated_data['password'])
        user_object.save()

        return user_object