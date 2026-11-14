import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, HelpCircle } from 'lucide-react';
import { Exhibit } from '../types';
import { getQuizQuestions } from '../data/museumData';

interface GuessTheMachineQuizProps {
  exhibits: Exhibit[];
  onInspectExhibit: (exhibit: Exhibit) => void;
}

export const GuessTheMachineQuiz: React.FC<GuessTheMachineQuizProps> = ({
  exhibits,
  onInspectExhibit,
}) => {
  const questions = useMemo(() => getQuizQuestions(exhibits), [exhibits]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredHistory, setAnsweredHistory] = useState<
    Array<{ questionId: string; chosen: string; correct: boolean }>
  >([]);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentQuestion?.correctAnswer;

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setAnsweredHistory((prev) => [
      ...prev,
      { questionId: currentQuestion.id, chosen: option, correct },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredHistory([]);
    setIsQuizFinished(false);
  };

  const matchedExhibit = useMemo(() => {
    if (!currentQuestion) return null;
    return exhibits.find((e) => e.id === currentQuestion.exhibitId) || null;
  }, [currentQuestion, exhibits]);

  return (
    <section
      id="guess-the-machine"
      aria-labelledby="guess-the-machine-heading"
      className="py-14 border-t border-slate-800"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Quiz Header & Live Score Counter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
              03. Interactive Field Challenge · 5 Questions
            </p>
            <h2
              id="guess-the-machine-heading"
              className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight"
            >
              Guess the machine
            </h2>
            <p className="text-base text-slate-300 max-w-2xl">
              Test what you have learned from the museum stories. Read the mission clue and pick the matching spacecraft from 4 options.
            </p>
          </div>

          {/* Live Score Readout */}
          <div className="flex items-center gap-4 px-4 py-2.5 bg-[#0B0E17] border border-slate-800 rounded font-mono text-xs shrink-0">
            <div>
              <span className="text-slate-400">QUESTION: </span>
              <strong className="text-white tabular-nums">
                {isQuizFinished ? `${questions.length}/${questions.length}` : `${currentIndex + 1}/${questions.length}`}
              </strong>
            </div>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <div>
              <span className="text-slate-400">SCORE: </span>
              <strong className="text-amber-300 text-sm tabular-nums">
                {score} / {questions.length}
              </strong>
            </div>
          </div>
        </div>

        {/* Quiz Card */}
        {!isQuizFinished ? (
          <div className="bg-[#0B0E17] border border-slate-800 rounded p-6 sm:p-8 space-y-6">
            {/* Progress Step Bar */}
            <div className="flex items-center gap-2">
              {questions.map((q, idx) => {
                const past = answeredHistory[idx];
                let barColor = 'bg-slate-800';
                if (past) {
                  barColor = past.correct ? 'bg-emerald-500' : 'bg-rose-500';
                } else if (idx === currentIndex) {
                  barColor = 'bg-amber-400';
                }
                return (
                  <div
                    key={q.id}
                    className={`h-1.5 flex-1 rounded-sm transition-colors ${barColor}`}
                  />
                );
              })}
            </div>

            {/* Clue Description from Story */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>QUESTION {currentIndex + 1} OF {questions.length}</span>
                <span aria-hidden="true">·</span>
                <span>ZONE CLUE: {currentQuestion.zone.toUpperCase()}</span>
              </div>

              <p className="text-lg sm:text-xl font-display text-white leading-relaxed">
                “{currentQuestion.prompt}”
              </p>
            </div>

            {/* 4 Answer Options */}
            <div
              role="group"
              aria-label={`Answer options for question ${currentIndex + 1}`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2"
            >
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedOption === option;
                const isOptionCorrect = option === currentQuestion.correctAnswer;

                let btnStyle =
                  'bg-[#07090E] border-slate-700 hover:border-amber-400 text-slate-100';
                if (isAnswered) {
                  if (isOptionCorrect) {
                    btnStyle =
                      'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isOptionCorrect) {
                    btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-[#07090E]/50 border-slate-800 text-slate-500 opacity-70';
                  }
                }

                const letter = ['A', 'B', 'C', 'D'][optIdx];

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(option)}
                    className={`flex items-center justify-between gap-3 p-4 rounded border text-left transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-mono border border-current/30 rounded shrink-0">
                        {letter}
                      </span>
                      <span className="text-sm sm:text-base font-medium">{option}</span>
                    </div>

                    {isAnswered && isOptionCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isOptionCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback Box */}
            {isAnswered && (
              <div
                aria-live="polite"
                className={`p-4 sm:p-5 rounded border space-y-3 ${
                  isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
                    : 'bg-rose-950/30 border-rose-500/50 text-rose-100'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-sm font-bold">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Correct! That machine is {currentQuestion.correctAnswer}.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        <span>
                          Not quite — you chose {selectedOption}. The correct answer is{' '}
                          {currentQuestion.correctAnswer}.
                        </span>
                      </>
                    )}
                  </div>

                  {matchedExhibit && (
                    <button
                      type="button"
                      onClick={() => onInspectExhibit(matchedExhibit)}
                      className="text-xs font-mono underline text-amber-300 hover:text-amber-200 whitespace-nowrap"
                    >
                      Open {matchedExhibit.name} Exhibit Panel
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong>From the exhibit story:</strong> {currentQuestion.clueFromStory}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-200 whitespace-nowrap shrink-0"
                  >
                    <span>
                      {currentIndex + 1 < questions.length
                        ? 'Next Question'
                        : 'See Final Score'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Final Score Summary Screen */
          <div className="bg-[#0B0E17] border border-slate-800 rounded p-6 sm:p-10 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300">
              <Award className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Quiz Complete · Final Telemetry Report
              </p>
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tabular-nums">
                Final Score: {score} / {questions.length}
              </h3>
              <p className="text-base text-slate-300 max-w-lg mx-auto">
                {score === questions.length
                  ? 'Perfect score! You know every rover, lander, helicopter, and deep-space probe in our museum.'
                  : score >= 3
                  ? 'Great mission knowledge! You recognized most of humanity’s robotic explorers.'
                  : 'Good start, space explorer! Click any exhibit on the globe to read its story and try again.'}
              </p>
            </div>

            {/* Question-by-Question Breakdown */}
            <div className="max-w-xl mx-auto border border-slate-800 rounded divide-y divide-slate-800 bg-[#07090E] text-left text-xs font-mono">
              {questions.map((q, idx) => {
                const record = answeredHistory[idx];
                return (
                  <div
                    key={q.id}
                    className="px-4 py-2.5 flex items-center justify-between gap-2"
                  >
                    <span className="text-slate-300">
                      Q{idx + 1}: <strong className="text-white">{q.correctAnswer}</strong>
                    </span>
                    <span
                      className={
                        record?.correct ? 'text-emerald-400 font-semibold' : 'text-rose-400'
                      }
                    >
                      {record?.correct ? '✓ Correct' : `✗ Chose ${record?.chosen || 'None'}`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-200 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
