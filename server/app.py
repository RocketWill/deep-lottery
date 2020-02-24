from flask import Flask
from flask_apscheduler import APScheduler
# 引用 congfig 配置
from config import APSchedulerJobConfig
app = Flask(__name__)
app.config.from_object(APSchedulerJobConfig)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
