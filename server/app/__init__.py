#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: willc
"""

from flask_restplus import Api
from flask import Blueprint

from .main.controller.lottery_drawn import api as drawn_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API BOILER-PLATE WITH JWT',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )

api.add_namespace(drawn_ns, path='/drawn')