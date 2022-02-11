# ======================================================================================================================
#
#                                                Serializers module
#
# ======================================================================================================================

# This is the Serializers module of the Camps app. These are meant to serialize/deserialize objects/jsons.

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from rest_framework import serializers
from .models import Camp, Review
from django.contrib.auth import get_user_model

# ======================================================================================================================
#                                               1. Camp serializer
# ======================================================================================================================


class CampSerializer(serializers.ModelSerializer):
    """
    Used for converting the Camp model into a serialized form, and the other way around.
    Built from the Rest Framework generic ModelSerializer (it builds the Serializer directly from the Model).
    """

    slug = serializers.SlugField(read_only=True)
    author = serializers.StringRelatedField()
    rating = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """
        Defines the data to be taken directly from the model.
        """

        # Take the Camp model as a starting point and serialize/deserialize all its fields
        model = Camp
        fields = '__all__'

    def get_rating(self, obj):
        """
        Calculate the rating of a camp (average between all its reviews).
        Please note: the rating field is not present in the database so it will only be serialized
        (and only in read_only mode).
        """

        # Loop through ratings of the camp and calculate the average between them
        rating_list = []
        for review in obj.reviews.all():
            rating_list.append(review.rating)
        if rating_list:
            rating = sum(rating_list)/len(rating_list)
        else:
            rating = 0

        return rating


class ReviewSerializer(serializers.ModelSerializer):
    """
    Used for converting the Review model into a serialized form, and the other way around.
    Built from the Rest Framework generic ModelSerializer (it builds the Serializer directly from the Model).
    """

    camp = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    author_image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """
        Defines the data to be taken directly from the model.
        """

        # Take the Review model as a starting point and serialize/deserialize all its fields
        model = Review
        fields = '__all__'

    def get_author_image(self, obj):
        """
        Define the image of the author that posted the review (average between all its reviews).
        Please note: the author_image field is not present in the database so it will only be serialized
        (and only in read_only mode).
        """

        # Retrieve the url of the author image
        User = get_user_model()
        author_user_object = User.objects.get(username=obj.author)
        request = self.context.get('request')
        author_image = request.build_absolute_uri(author_user_object.image.url)

        return author_image