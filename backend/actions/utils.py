from rest_framework import permissions

class AllowAnyGet(permissions.BasePermission):
    
    def has_permissions(self, request, view):

        if request.method == 'GET':
            return True

        return request.user and request.user.is_authenticated