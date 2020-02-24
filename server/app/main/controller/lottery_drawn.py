#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: willc
"""

from flask import request
from flask_restplus import Resource
from ..util.dto import DrawnDto
from ..service.drawn_service import get_top_num_drawn_data

api = DrawnDto.api

@api.route('/list-all')
class DrawnList(Resource):
    @api.doc("list_of_drawn_records")
    def get(self):
        return(get_top_num_drawn_data(10), 200)