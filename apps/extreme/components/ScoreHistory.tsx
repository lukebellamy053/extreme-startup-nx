import React, { FC } from "react";
import {AxisOptions, Chart, UserSerie} from "react-charts";

type MyDatum = { score: number, date: number }

interface Props {
    scores: {players: {name: string, score: number}[], date: number}[]
}

export const ScoreHistory: FC<Props> = ({scores}) => {

    const data: UserSerie<MyDatum>[] = React.useMemo(
        () => {
            if(!scores) {
                return [] as UserSerie<MyDatum>[];
            }
            let playerScoresMap = scores.reduce((scoreMap, scoreSet) => {
                for(let player of Object.values(scoreSet.players)) {
                    if (!scoreMap[player.name]) {
                        scoreMap[player.name] = {
                            label: player.name,
                            data: []
                        }
                    }
                    scoreMap[player.name].data.push({
                        date: scoreSet.date,
                        score: player.score
                    })
                }
                return scoreMap;
            }, {});
            return Object.values(playerScoresMap) as UserSerie<MyDatum>[];
        }, [scores])

    const primaryAxis = React.useMemo(
        (): AxisOptions<MyDatum> => ({
            scaleType: 'time',
            getValue: datum => new Date(datum.date),
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<MyDatum>[] => [
            {
                getValue: datum => datum.score,
            },
        ],
        []
    )

    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
            }}
        />
    )
}
