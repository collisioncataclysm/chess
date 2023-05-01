// Import necessary libraries
import * as THREE from 'three';
import { Chessboard, ChessPieces, ChessMoves } from 'three-chessboard';

// Initialize the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();

// Add the renderer to the page
document.body.appendChild(renderer.domElement);

// Create a chessboard
const board = new Chessboard(scene, { size: 8 });

// Create a set of chess pieces
const pieces = new ChessPieces(scene, { pieceSet: 'staunty' });

// Create a set of chess moves
const moves = new ChessMoves();

// Create a function to handle a move event
function onMove(from, to) {
  // Get the piece at the starting position
  const piece = pieces.getPieceAt(from);

  // Move the piece to the destination
  piece.moveTo(to);

  // Update the list of valid moves
  moves.update(board, pieces);
}

// Add event listeners for when a piece is picked up and moved
pieces.addEventListener('pick', (event) => {
  const { piece, position } = event.detail;

  // Get the list of valid moves for the piece
  const validMoves = moves.getValidMoves(piece, position);

  // Highlight the valid moves on the board
  board.highlightSquares(validMoves);

  // Add an event listener for when the piece is moved
  piece.addEventListener('drop', (event) => {
    const { from, to } = event.detail;

    // Clear the highlighting from the board
    board.clearHighlighting();

    // Handle the move
    onMove(from, to);
  });
});

// Set the camera position
camera.position.set(0, 10, 0);
camera.lookAt(0, 0, 0);

// Set the renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Render the scene
renderer.render(scene, camera);
