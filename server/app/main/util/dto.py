#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: willc
"""

from flask_restplus import Namespace, fields


class DrawnDto:
    api = Namespace('drawn', description='lottery drawn related operations')