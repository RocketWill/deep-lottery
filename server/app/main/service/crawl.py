#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: willc
"""

from app.main import mongo
from utils.lottery_crawl import LotteryCrawl

collection = mongo["drawn"]

def save_drawn_data():
    lc = LotteryCrawl()
    lottery_data = list(lc.crawl().values())
    for data in lottery_data:
        collection.save(data)