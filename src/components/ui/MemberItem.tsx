import React from 'react'
import { useTranslation } from 'react-i18next'

const MemberItem = (props: any) => {
    const {t} = useTranslation()
    return (
        <div data-v-d324c76e className='member-item'>
            <div data-v-d324c76e className='member-info'>
                <div data-v-d324c76e className='info-content'>
                    <div data-v-d324c76e className='name-row'>
                        <div data-v-d324c76e >
                            <div className='name' data-v-d324c76e>
                                {props?.userName}
                            </div>
                            <div className='ph' data-v-d324c76e>
                                {props?.phone}
                            </div>
                        </div>
                        <div data-v-d324c76e className='time'>
                            <div data-v-d324c76e >
                                {new Date(props?.createdAt)?.toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div data-v-d324c76e className='id-row'>
                        <div data-v-d324c76e className='id'>
                            {props?.userId}
                        </div>
                    </div>

                </div>
            </div>
            <div data-v-d324c76e className='member-data'>
                <div data-v-d324c76e className='data-item'>
                    <div data-v-d324c76e className='label'>
                        {t("Đã mời")}
                    </div>
                    <div data-v-d324c76e className='label'>
                        {props?.inviteUser?.length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberItem