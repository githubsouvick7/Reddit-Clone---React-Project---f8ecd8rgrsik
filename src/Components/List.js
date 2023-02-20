import React, { useEffect, useState } from 'react'
import './List.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Data } from './Data';

const List = () => {
    const [count, setCount] = useState(0);

    const plusCount = () => {
        setCount(count + 1)
    }
    const minCount = () => {
        if (count != 0) {
            setCount(count - 1);
        }
    }

    return (
        <>
            {
                Data.map(item => {
                    return (
                        <div className="list">
                            <div className="sidebox">
                                <Tippy content={<p>UpVote</p>}>
                                    <i class="fa-solid fa-arrow-up" onClick={plusCount}></i>
                                </Tippy>
                                <span>{count}</span>
                                <Tippy content={<p>DownVote</p>}>
                                    <i class="fa-solid fa-arrow-down" onClick={minCount}></i>
                                </Tippy>
                            </div>
                            <div className="box">
                                <div className='title'>
                                    <div>
                                        <button className='join'>join</button>
                                        <i class="fa-solid fa-eye-slash"></i>
                                    </div>

                                </div>
                                <div className='posttext'>
                                    <h4>{item.description}</h4>
                                </div>
                                <div className='like'>
                                    <div><i class="fa-solid fa-comment"></i> Comment</div>
                                    <div><i class="fa-solid fa-share"></i> Share</div>
                                    <div><i class="fa-solid fa-bookmark"></i> Save</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default List;