#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: willc
"""

from bs4 import BeautifulSoup
import requests
from collections import defaultdict

class LotteryCrawl:
    def __init__(self):
        self.crawl_page = 'http://www.taiwanlottery.com.tw/Lotto/Lotto649/history.aspx'
        self.target_section = ['Lotto649Control_history_dlQuery_L649_DDate_', "Lotto649Control_history_dlQuery_L649_DrawTerm_", 'Lotto649Control_history_dlQuery_No1_','Lotto649Control_history_dlQuery_No2_','Lotto649Control_history_dlQuery_No3_','Lotto649Control_history_dlQuery_No4_','Lotto649Control_history_dlQuery_No5_','Lotto649Control_history_dlQuery_No6_','Lotto649Control_history_dlQuery_SNo_']

    def _search_target(self, css_class):
        if (css_class != None):
            for i in range(len(self.target_section)):
                if self.target_section[i] in css_class:
                    return css_class

    def _get_target_content(self):
        res = requests.get(self.crawl_page, timeout=30)
        soup = BeautifulSoup(res.text, 'lxml')
        header_Info = soup.find_all(id=self._search_target)
        return header_Info

    def _default_lottery_object(self):
        return lambda: {
            "_id": "",
            "serial_num": "",
            "drawn_date": "",
            "reg_num": [],
            "spe_num": 0
        }

    def _parse_html(self, target_content, number_count=9):
        data_Info_Dict = defaultdict(self._default_lottery_object())
        current_date = ""
        current_id = ""
        for index in range(len(target_content)):
            if (index % number_count == 0):
                current_id = target_content[index].text
            elif (index % number_count == 1):
                current_date = target_content[index].text
                data_Info_Dict[current_date]["_id"] = current_id
                data_Info_Dict[current_date]["serial_num"] = current_id
                data_Info_Dict[current_date]["drawn_date"] = current_date
            elif (index % number_count == 8):
                data_Info_Dict[current_date]["spe_num"] = int(target_content[index].text)
            else:
                data_Info_Dict[current_date]["reg_num"].append(int(target_content[index].text))
        return data_Info_Dict

    def crawl(self):
        target_content = self._get_target_content()
        data_Info_Dict = self._parse_html(target_content, 9)
        return data_Info_Dict

def lottery_crawl():
    lc = LotteryCrawl()
    lottery_data = lc.crawl()
    print(lottery_data)