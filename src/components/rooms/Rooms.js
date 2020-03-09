import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as io from 'socket.io-client';

const socket = io('http://localhost:5050');

const Rooms = () => {
  const [rooms, setRooms] = useState({});
  const [roomString, setRoomString] = useState('');

  useEffect(() => {
    socket.emit('get_rooms');
  }, []);

  socket.on('return_rooms', data => {
    setRooms(data);
  });

  const submitRoom = e => {
    e.preventDefault();
    socket.emit('create_room', roomString);
  };
  return (
    <div className="rooms">
      <form onSubmit={submitRoom} className="create-room">
        <input
          onChange={e => setRoomString(e.target.value)}
          type="text"
          name="roomString"
          id="roomString"
          value={roomString}
          placeholder="Create a room"
          required
        />
        <input type="submit" value="Create" />
      </form>
      <div className="room-list"></div>
      {Object.keys(rooms).map(roomName => (
        <Link
          className="room-link"
          to={`/tarneeb/rooms/${roomName}`}
          key={roomName}
        >
          {roomName}
        </Link>
      ))}
    </div>
  );
};

export default Rooms;
