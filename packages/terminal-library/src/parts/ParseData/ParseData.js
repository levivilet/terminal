import * as State from '../ParserState/ParserState.js'
import * as OperationType from '../OperationType/OperationType.js'

export const parseData = (array) => {
  if (typeof array === 'string') {
    array = new TextEncoder().encode(array)
  }

  if (!(array instanceof Uint8Array)) {
    throw new Error('invalid data, must be of type Uint8Array')
  }
  let state = State.TopLevelContent
  let i = 0
  let currentParam = 0
  let params = []
  let printStartIndex = -1
  const result = []
  while (i < array.length) {
    const value = array[i]
    switch (state) {
      case State.TopLevelContent:
        middle: switch (value) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            i++
            break
          case /* \u0007 */ 7:
            result.push({
              type: OperationType.Bell,
            })
            i++
            break
          case /* \u0008 */ 8:
            result.push({
              type: OperationType.Backspace,
            })
            i++
            break
          case /* \t */ 9:
            i++
            break
          case /* \n */ 10:
            result.push({
              type: OperationType.LineFeed,
            })
            i++
            break
          case 11:
          case 12:
            i++
            break
          case /* \r */ 13:
            result.push({
              type: OperationType.CarriageReturn,
            })
            i++
            break
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
            i++
            break
          case /* \u001b */ 27:
            state = State.Escaped
            i++
            break
          case 28:
          case 29:
          case 30:
          case 31:
            i++
            break
          case 32:
          case 33:
          case 34:
          case 35:
          case 36:
          case 37:
          case 38:
          case 39:
          case 40:
          case 41:
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          case 58:
          case 59:
          case 60:
          case 61:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 81:
          case 82:
          case 83:
          case 84:
          case 85:
          case 86:
          case 87:
          case 88:
          case 89:
          case 90:
          case 91:
          case 92:
          case 93:
          case 94:
          case 95:
          case 96:
          case 97:
          case 98:
          case 99:
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
          case 117:
          case 118:
          case 119:
          case 120:
          case 121:
          case 122:
          case 123:
          case 124:
          case 125:
          case 126:
          case 127:
            printStartIndex = i++
            while (i < array.length) {
              const element = array[i]
              if (element >= 32 && element < 126) {
                i++
                continue
              }
              switch (element) {
                case /* \u001b */ 27:
                  result.push({
                    type: OperationType.Print,
                    start: printStartIndex,
                    end: i,
                  })
                  state = State.Escaped
                  i++
                  break middle
                case /* \u0007 */ 7:
                  result.push(
                    {
                      type: OperationType.Print,
                      start: printStartIndex,
                      end: i,
                    },
                    {
                      type: OperationType.Bell,
                    },
                  )
                  i++
                  state = State.TopLevelContent
                  break middle
                case /* \u0008 */ 8:
                  result.push(
                    {
                      type: OperationType.Print,
                      start: printStartIndex,
                      end: i,
                    },
                    {
                      type: OperationType.Backspace,
                    },
                  )
                  i++
                  state = State.TopLevelContent
                  break middle
                case /* \r */ 13:
                  result.push(
                    {
                      type: OperationType.Print,
                      start: printStartIndex,
                      end: i,
                    },
                    {
                      type: OperationType.CarriageReturn,
                    },
                  )
                  i++
                  state = State.TopLevelContent
                  break middle
                default:
                  i++
                  break
              }
            }
            result.push({
              type: OperationType.Print,
              start: printStartIndex,
              end: i,
            })
            break
          default:
            // TODO this is slow
            throw new Error('no')
        }
        break
      case State.Escaped:
        switch (value) {
          case /* ( */ 40:
            state = State.Charset
            break
          case /* [ */ 91:
            params = []
            state = State.Csi
            break
          case /* ] */ 93:
            state = State.Osc
            break
          case /* P */ 80:
            state = State.Dcs
            break
          case /* _ */ 95:
            break
          case /* ^ */ 94:
            break
          case /* c */ 99:
            break
          case /* E */ 69:
            result.push({
              type: OperationType.NextLine,
            })
          case /* D */ 68:
            result.push({
              type: OperationType.Index,
            })
            break
          case /* 7 */ 55:
            result.push({
              type: OperationType.SaveCursor,
            })
            state = State.TopLevelContent
            break
          case /* 8 */ 56:
            result.push({
              type: OperationType.Backspace,
            })
            state = State.TopLevelContent
            break
          case /* H */ 72:
            result.push({
              type: OperationType.TabSet,
            })
            break
          default:
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.Charset:
        i++
        break
      case State.Csi:
        switch (value) {
          case /*   */ 32:
            state = State.AfterSpace
            break
          case /* ! */ 33:
            state = State.AfterExclamationMark
            break
          case /* 0 */ 48:
          case /* 1 */ 49:
          case /* 2 */ 50:
          case /* 3 */ 51:
          case /* 4 */ 52:
          case /* 5 */ 53:
          case /* 6 */ 54:
          case /* 7 */ 55:
          case /* 8 */ 56:
          case /* 9 */ 57:
            currentParam = value - 48
            state = State.AfterEscape3
            break
          case /* ? */ 63:
            state = State.AfterQuestionMark
            break
          case /* @ */ 64:
            result.push({
              type: OperationType.InsertBlankCharacters,
              params,
            })
            state = State.TopLevelContent
            break
          case /* A */ 65:
            result.push({
              type: OperationType.CursorUp,
              params,
            })
            state = State.TopLevelContent
            break
          case /* B */ 66:
            result.push({
              type: OperationType.CursorDown,
              params,
            })
            state = State.TopLevelContent
            break
          case /* C */ 67:
            result.push({
              type: OperationType.CursorRight,
              params,
            })
            state = State.TopLevelContent
            break
          case /* D */ 68:
            result.push({
              type: OperationType.CursorLeft,
              params,
            })
            state = State.TopLevelContent
            break
          case /* E */ 69:
            result.push({
              type: OperationType.CursorNextLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* F */ 70:
            result.push({
              type: OperationType.CursorPrecedingLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* G */ 71:
            result.push({
              type: OperationType.CursorCharacterAbsolute,
              params,
            })
            state = State.TopLevelContent
            break
          case /* H */ 72:
            result.push({
              type: OperationType.CursorPosition,
              params,
            })
            state = State.TopLevelContent
            break
          case /* I */ 73:
            result.push({
              type: OperationType.CursorForwardTabulation,
              params,
            })
            state = State.TopLevelContent
            break
          case /* J */ 74:
            result.push({
              type: OperationType.EraseInDisplay,
              params,
            })
            state = State.TopLevelContent
            break
          case /* K */ 75:
            result.push({
              type: OperationType.EraseInLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* L */ 76:
            result.push({
              type: OperationType.InsertLines,
              params,
            })
            state = State.TopLevelContent
            break
          case /* M */ 77:
            result.push({
              type: OperationType.DeleteLines,
              params,
            })
            state = State.TopLevelContent
            break
          case /* P */ 80:
            result.push({
              type: OperationType.DeleteCharacters,
              params,
            })
            state = State.TopLevelContent
            break
          case /* S */ 83:
            result.push({
              type: OperationType.ScrollUp,
              params,
            })
            state = State.TopLevelContent
            break
          case /* T */ 84:
            result.push({
              type: OperationType.ScrollDown,
              params,
            })
            state = State.TopLevelContent
            break
          case /* X */ 88:
            result.push({
              type: OperationType.EraseCharacters,
              params,
            })
            state = State.TopLevelContent
            break
          case /* Z */ 90:
            result.push({
              type: OperationType.CursorBackwardTabulation,
              params,
            })
            state = State.TopLevelContent
            break
          case /* ^ */ 94:
            result.push({
              type: OperationType.ScrollDown,
              params,
            })
            state = State.TopLevelContent
            break
          case /* ` */ 96:
            result.push({
              type: OperationType.CharacterPositionAbsolute,
              params,
            })
            state = State.TopLevelContent
            break
          case /* a */ 97:
            result.push({
              type: OperationType.CharacterPositionRelative,
              params,
            })
            state = State.TopLevelContent
            break
          case /* b */ 98:
            result.push({
              type: OperationType.RepeatPrecedingGraphicCharacter,
              params,
            })
            state = State.TopLevelContent
            break
          case /* d */ 100:
            result.push({
              type: OperationType.LinePositionAbsolute,
              params,
            })
            state = State.TopLevelContent
            break
          case /* e */ 101:
            result.push({
              type: OperationType.LinePositionRelative,
              params,
            })
            state = State.TopLevelContent
            break
          case /* f */ 102:
            result.push({
              type: OperationType.HorizontalAndVerticalPosition,
              params,
            })
            state = State.TopLevelContent
            break
          case /* g */ 103:
            result.push({
              type: OperationType.TabClear,
              params,
            })
            state = State.TopLevelContent
            break
          case /* h */ 104:
            result.push({
              type: OperationType.SetMode,
              params,
            })
            state = State.TopLevelContent
            break
          case /* l */ 108:
            result.push({
              type: OperationType.ResetMode,
              params,
            })
            state = State.TopLevelContent
            break
          case /* m */ 109:
            result.push({ type: OperationType.SetCharAttributes, params })
            state = State.TopLevelContent
            break
          case /* u */ 117:
            result.push({
              type: OperationType.RestoreCursor,
            })
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.AfterEscape3:
        switch (value) {
          case /*   */ 32:
            params.push(currentParam)
            state = State.AfterSpace
            break
          case /* ; */ 59:
            params.push(currentParam)
            state = State.AfterEscape3AfterSemicolon
            break
          case /* 0 */ 48:
          case /* 1 */ 49:
          case /* 2 */ 50:
          case /* 3 */ 51:
          case /* 4 */ 52:
          case /* 5 */ 53:
          case /* 6 */ 54:
          case /* 7 */ 55:
          case /* 8 */ 56:
          case /* 9 */ 57:
            currentParam = currentParam * 10 + value - 48
            break
          case /* @ */ 64:
            params.push(currentParam)
            result.push({
              type: OperationType.InsertBlankCharacters,
              params,
            })
            state = State.TopLevelContent
            break
          case /* A */ 65:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorUp,
              params,
            })
            state = State.TopLevelContent
            break
          case /* B */ 66:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorDown,
              params,
            })
            state = State.TopLevelContent
            break
          case /* C */ 67:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorRight,
              params,
            })
            state = State.TopLevelContent
            break
          case /* D */ 68:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorLeft,
              params,
            })
            state = State.TopLevelContent
            break
          case /* E */ 69:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorNextLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* F */ 70:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorPrecedingLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* G */ 71:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorCharacterAbsolute,
              params,
            })
            state = State.TopLevelContent
            break
          case /* H */ 72:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorPosition,
              params,
            })
            state = State.TopLevelContent
            break
          case /* I */ 73:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorForwardTabulation,
              params,
            })
            state = State.TopLevelContent
            break
          case /* J */ 74:
            params.push(currentParam)
            result.push({
              type: OperationType.EraseInDisplay,
              params,
            })
            state = State.TopLevelContent
            break
          case /* K */ 75:
            params.push(currentParam)
            result.push({
              type: OperationType.EraseInLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* L */ 76:
            params.push(currentParam)
            result.push({
              type: OperationType.InsertLines,
              params,
            })
            state = State.TopLevelContent
            break
          case /* M */ 77:
            params.push(currentParam)
            result.push({
              type: OperationType.DeleteLines,
              params,
            })
            state = State.TopLevelContent
            break
          case /* P */ 80:
            params.push(currentParam)
            result.push({
              type: OperationType.DeleteCharacters,
              params,
            })
            state = State.TopLevelContent
            break
          case /* S */ 83:
            params.push(currentParam)
            result.push({
              type: OperationType.ScrollUp,
              params,
            })
            state = State.TopLevelContent
            break
          case /* T */ 84:
            params.push(currentParam)
            result.push({
              type: OperationType.ScrollDown,
              params,
            })
            state = State.TopLevelContent
            break
          case /* X */ 88:
            params.push(currentParam)
            result.push({
              type: OperationType.EraseCharacters,
              params,
            })
            state = State.TopLevelContent
            break
          case /* Z */ 90:
            params.push(currentParam)
            result.push({
              type: OperationType.CursorBackwardTabulation,
              params,
            })
            state = State.TopLevelContent
            break
          case /* ^ */ 94:
            params.push(currentParam)
            result.push({
              type: OperationType.ScrollDown,
              params,
            })
            state = State.TopLevelContent
            break
          case /* ` */ 96:
            params.push(currentParam)
            result.push({
              type: OperationType.CharacterPositionAbsolute,
              params,
            })
            state = State.TopLevelContent
            break
          case /* a */ 97:
            params.push(currentParam)
            result.push({
              type: OperationType.CharacterPositionRelative,
              params,
            })
            state = State.TopLevelContent
            break
          case /* b */ 98:
            params.push(currentParam)
            result.push({
              type: OperationType.RepeatPrecedingGraphicCharacter,
              params,
            })
            state = State.TopLevelContent
            break
          case /* d */ 100:
            params.push(currentParam)
            result.push({
              type: OperationType.LinePositionAbsolute,
              params,
            })
            state = State.TopLevelContent
            break
          case /* e */ 101:
            params.push(currentParam)
            result.push({
              type: OperationType.LinePositionRelative,
              params,
            })
            state = State.TopLevelContent
            break
          case /* f */ 102:
            params.push(currentParam)
            result.push({
              type: OperationType.HorizontalAndVerticalPosition,
              params,
            })
            state = State.TopLevelContent
            break
          case /* g */ 103:
            params.push(currentParam)
            result.push({
              type: OperationType.TabClear,
              params,
            })
            state = State.TopLevelContent
            break
          case /* h */ 104:
            params.push(currentParam)
            result.push({
              type: OperationType.SetMode,
              params,
            })
            state = State.TopLevelContent
            break
          case /* l */ 108:
            params.push(currentParam)
            result.push({
              type: OperationType.ResetMode,
              params,
            })
            state = State.TopLevelContent
            break
          case /* m */ 109:
            params.push(currentParam)
            result.push({
              type: OperationType.SetCharAttributes,
              params,
            })
            state = State.TopLevelContent
            break
          default:
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.AfterEscape3AfterSemicolon:
        switch (value) {
          case /* 0 */ 48:
          case /* 1 */ 49:
          case /* 2 */ 50:
          case /* 3 */ 51:
          case /* 4 */ 52:
          case /* 5 */ 53:
          case /* 6 */ 54:
          case /* 7 */ 55:
          case /* 8 */ 56:
          case /* 9 */ 57:
            currentParam = value - 48
            state = State.AfterEscape3
            break
        }
        i++
        break
      case State.AfterQuestionMark:
        switch (value) {
          case /* 0 */ 48:
          case /* 1 */ 49:
          case /* 2 */ 50:
          case /* 3 */ 51:
          case /* 4 */ 52:
          case /* 5 */ 53:
          case /* 6 */ 54:
          case /* 7 */ 55:
          case /* 8 */ 56:
          case /* 9 */ 57:
            currentParam = value - 48
            state = State.AfterQuestionMark2
            break
          case /* J */ 74:
            result.push({
              type: OperationType.EraseInDisplay,
              params,
            })
            state = State.TopLevelContent
            break
          case /* K */ 75:
            result.push({
              type: OperationType.EraseInLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* h */ 104:
            result.push({
              type: OperationType.PrivateModeSet,
              params,
            })
            state = State.TopLevelContent
            break
          case /* l */ 108:
            result.push({
              type: OperationType.PrivateModeReset,
              params,
            })
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.AfterQuestionMark2:
        switch (value) {
          case /* 0 */ 48:
          case /* 1 */ 49:
          case /* 2 */ 50:
          case /* 3 */ 51:
          case /* 4 */ 52:
          case /* 5 */ 53:
          case /* 6 */ 54:
          case /* 7 */ 55:
          case /* 8 */ 56:
          case /* 9 */ 57:
            currentParam = currentParam * 10 + value - 48
            break
          case /* ; */ 59:
            params.push(currentParam)
            state = State.AfterQuestionMark
            break
          case /* J */ 74:
            params.push(currentParam)
            result.push({
              type: OperationType.EraseInDisplay,
              params,
            })
            state = State.TopLevelContent
            break
          case /* K */ 75:
            params.push(currentParam)
            result.push({
              type: OperationType.EraseInLine,
              params,
            })
            state = State.TopLevelContent
            break
          case /* h */ 104:
            params.push(currentParam)
            result.push({
              type: OperationType.PrivateModeSet,
              params,
            })
            state = State.TopLevelContent
            break
          case /* l */ 108:
            params.push(currentParam)
            result.push({
              type: OperationType.PrivateModeReset,
              params,
            })
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.AfterExclamationMark:
        switch (value) {
          case /* p */ 112:
            result.push({
              type: OperationType.SoftTerminalReset,
            })
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.AfterSpace:
        switch (value) {
          case /* @ */ 64:
            result.push({
              type: OperationType.ShiftLeftColumns,
              params,
            })
            state = State.TopLevelContent
            break
          case /* q */ 113:
            result.push({
              type: OperationType.SetCursorStyle,
              params,
            })
            state = State.TopLevelContent
            break
          case /* t */ 116:
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.Osc:
        switch (value) {
          case /* 0 */ 48:
          case /* 1 */ 49:
          case /* 2 */ 50:
          case /* 3 */ 51:
          case /* 4 */ 52:
          case /* 5 */ 53:
          case /* 6 */ 54:
          case /* 7 */ 55:
          case /* 8 */ 56:
          case /* 9 */ 57:
            currentParam = value - 48
            state = State.Osc2
            break
          case /* \u0007 */ 7:
            result.push({
              type: OperationType.SetTextParameters,
              params,
            })
            state = State.TopLevelContent
            break
        }
        i++
        break
      case State.Osc2:
        switch (value) {
          case /* 0 */ 48:
          case /* 1 */ 49:
          case /* 2 */ 50:
          case /* 3 */ 51:
          case /* 4 */ 52:
          case /* 5 */ 53:
          case /* 6 */ 54:
          case /* 7 */ 55:
          case /* 8 */ 56:
          case /* 9 */ 57:
            currentParam = currentParam * 10 + value - 48
            break
          case /* ; */ 59:
            params.push(currentParam)
            state = State.Osc3
            break
        }
        i++
        break
      case State.Osc3:
        switch (value) {
          case /* \u0007 */ 7:
            result.push({
              type: OperationType.SetTextParameters,
              params,
            })
            state = State.TopLevelContent
            break
          default:
            params.push(value)
        }
        i++
    }
  }
  return result
}
