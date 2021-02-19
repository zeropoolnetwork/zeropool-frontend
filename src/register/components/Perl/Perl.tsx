import React, { useState } from 'react';

export type PerlProps = {
    number: number
    isActive: boolean
}

export const Perl = (props: PerlProps) => {
    return(
        <div>
            {props.number}
        </div>
    )
}

