import socketio
import time
sio = socketio.Client()

isRunning = False


@sio.event
def connect():
    print("I'm connected!")
    time.sleep(2)
    sio.emit('message', "hello server")
    print("I'm connected!")


@sio.event
def updateFlag(data):
    global isRunning
    time.sleep(2)
    isRunning = data["is_running"]
    sio.emit("update_flag_running_success", data)


@sio.event
def connect_error(data):
    print("The connection failed!")


@sio.event
def disconnect():
    print("I'm disconnected!")


def running(soc):
    global isRunning
    while True:
        if (isRunning):
            print("Running")
            soc.emit('message', "hello server q3123")
        else:
            print("Stopping")
        time.sleep(5)


print("Start connect")
sio.connect('ws://localhost:5000', headers={'name': "NgocLam"})
running(sio)
sio.wait()
