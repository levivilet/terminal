export const createGlyph = (tmpCtx, character) => {
  tmpCtx.font = "30px serif";
  tmpCtx.fillStyle = "lightblue";
  tmpCtx.fillText(character, 0, 30);
  return {};
};
