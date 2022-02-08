# ======================================================================================================================
#
#                                               Permissions module
#
# ======================================================================================================================

# This is the Permissions module of the Users app. The custom permissions of the users are defined here.

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from rest_framework import permissions

# ======================================================================================================================
#                                                 1. Permissions
# ======================================================================================================================


class IsOwner(permissions.BasePermission):
    """
    Custom permission class for checking whether the current user is the user object.
    """

    def has_object_permission(self, request, view, obj):
        """
        Overrides a method of generic BasePermission class.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.username == request.user.username
