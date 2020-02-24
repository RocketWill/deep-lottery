#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: willc
"""

import os
import unittest
from werkzeug.utils import cached_property
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_cors import CORS

from flask_apscheduler import APScheduler
from app.main import create_app, db
from app.main.config import APSchedulerJobConfig
from app import blueprint


app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
CORS(app)
app.register_blueprint(blueprint)
app.config.from_object(APSchedulerJobConfig)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

app.app_context().push()

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)

@manager.command
def run():
    app.run()

@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()