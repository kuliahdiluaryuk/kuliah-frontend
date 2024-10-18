import { create } from 'zustand'

type InstructionType = {
  level: string
  topic: string
  assistant: string
  language: string
}

interface Instruction {
  instruction: InstructionType | null
  addInstrunction: (data: InstructionType) => void
}

const useInstruction = create<Instruction>()((set) => ({
  instruction: null,
  addInstrunction: (data: InstructionType) => {
    set({ instruction: data })
  },
}))

export default useInstruction
