import React, {useMemo} from "react";
import {AxisOptions, Chart} from "react-charts";

type MyDatum = { name: string, score: number }

export default function CurrentScoreBarChart({players}) {

    const data = useMemo(() => ([
        {
            label: 'Score',
            data: players.sort((a, b) => {
                return a.score > b.score ? -1 : 1
            }).slice(0, 2)
        },
    ]), [players]);

    const primaryAxis = useMemo(
        (): AxisOptions<MyDatum> => ({
            getValue: datum => datum.name,
        }),
        []
    )

    const secondaryAxes = useMemo(
        (): AxisOptions<MyDatum>[] => [
            {
                getValue: datum => datum.score,
                min: 0
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
