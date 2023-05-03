import socketio
import time
sio = socketio.Client()


@sio.event(namespace='/ngoc-lam')
def connect():
    print("I'm connected!")
    time.sleep(2)
    sio.emit('message', {'foo': 'bar'},namespace='/ngoc-lam')
    print("I'm connected!")

@sio.event
def connect_error(data):
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")

print("Start connect")
sio.connect('ws://localhost:3000', namespaces='/ngoc-lam')

sio.wait()