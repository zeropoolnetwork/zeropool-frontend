import React from 'react';

import './Perl.scss';

export type PerlProps = {
    number: number
    isActive: boolean
}

export const Perl = (props: PerlProps) => {
    return(
        <div className={'Perl' + (props.isActive ? ' Perl_Active' : '')}>
            <div className="Perl-Number">
                {props.number}
            </div>
        </div>
    )
}
