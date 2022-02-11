# ======================================================================================================================
#
#                                                 Settings module
#
# ======================================================================================================================

# This is the Settings module of the project.
# This module was initially generated automatically by 'django-admin startproject'.

# ======================================================================================================================
#                                                    Libraries
# ======================================================================================================================

from pathlib import Path
import os

# ======================================================================================================================
#                                              1. Django settings
# ======================================================================================================================

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-gq!omrbjm5$6wdi4j@!*86sc+!rvx5--5!b648pi5g^bk$2ah='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'users',
    'camps',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders'
]
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
ROOT_URLCONF = '_project.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = '_project.wsgi.application'
AUTH_USER_MODEL = 'users.User'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript)
# https://docs.djangoproject.com/en/4.0/howto/static-files/
STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ======================================================================================================================
#                                          2. REST Framework settings
# ======================================================================================================================

# Don't forget to add 'rest_framework' and 'rest_framework.authtoken' apps to 'INSTALLED_APPS' list!

REST_FRAMEWORK = {

    # In the whole project the Token Authentication and Session Authentication will be used
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',  # this allows to use tokens for authentication
        'rest_framework.authentication.SessionAuthentication'  # this allows to login on the Browsable API page
    ]
}

# ======================================================================================================================
#                                             3. Pillow settings
# ======================================================================================================================

# Don't forget to add 'pillow' app to 'INSTALLED_APPS' list!
# Don't forget to specify the 'MEDIA_ROOT' and 'MEDIA_URL'!

# Media files (images)
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# ======================================================================================================================
#                                           3. Corsheaders settings
# ======================================================================================================================

# Don't forget to add 'corsheaders' app to 'INSTALLED_APPS' list!
# Don't forget to add 'corsheaders.middleware.CorsMiddleware' middleware to 'MIDDLEWARE' list!

# Define from which addresses the API will be accessible
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]