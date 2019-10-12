import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

type SetStateFunc = Dispatch<SetStateAction<number>>;

const linePoints = [40, 100, 300, 1000];

export const useGameState = (
  clearedLines: number,
): [number, SetStateFunc, number, SetStateFunc, number, SetStateFunc] => {
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [lines, setLines] = useState<number>(0);

  const scoreCalculator = useCallback(() => {
    if (clearedLines > 0) {
      setScore(prev => prev + linePoints[clearedLines - 1] * (level + 1));
      setLines(prev => prev + clearedLines);
    }
  }, [clearedLines, level]);

  useEffect(() => {
    scoreCalculator();
  }, [scoreCalculator, clearedLines, score]);

  return [score, setScore, level, setLevel, lines, setLines];
};
