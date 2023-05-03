import { useEffect } from 'react';
import io from 'socket.io-client';

const IndexPage = () => {
  useEffect(() => {
    const socket = io('ws://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Socket.IO Client Example</h1>
    </div>
  );
};

export default IndexPage;