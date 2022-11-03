import React from 'react';
import switchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';
import SpriteContainer from '../../../common/styles/SpriteContainer';

type SpriteProps = {
  newSprite: string;
  spriteName: string;
  // eslint-disable-next-line no-unused-vars
  setNewSprite: (choice: string) => void;
};
function SpriteRadio({
  newSprite,
  spriteName,
  setNewSprite,
}: SpriteProps) {
  return (
    <div className="radio">
      <label htmlFor={spriteName}>
        <input
          type="radio"
          value={spriteName}
          checked={newSprite === spriteName}
          onChange={(e) => setNewSprite(e.target.value)}
        />
      </label>
      <SpriteContainer
        src={switchSpriteSheet(spriteName)}
        alt={spriteName}
      />
    </div>
  );
}

export default SpriteRadio;
