
import { Avatar, Badge, Select } from 'antd';

import { SaveOutlined } from '@ant-design/icons';
const { Option } = Select;
import { Button } from 'antd';

const CourceEditForm = ({ handleSubmit, handlechange, handleImage, values, setValues, preview, uploadButtenTxt, handleImageRemove }) => {

    const children = [];
    for (let i = 9.99; i <= 100.99; i++) {
        children.push(<Option key={i.toFixed(2)}> ${i.toFixed(2)}</Option>)
    }

    return <>
        <form onSubmit={handleSubmit}>
            <div className='form-group m-2,pt-3'>
                <input type='text'

                    name='name'
                    className='form-control '
                    placeholder='Name'
                    value={values.name}
                    onChange={handlechange}

                />
            </div>

            <div className='form-group m-2,pt-3'>
                <textarea
                    name='description'
                    cols='7'
                    rows='7'
                    value={values.description}
                    className='form-control'
                    onChange={handlechange}
                ></textarea>


            </div>



            <div className='form-group'>
                <div className='form-row row'>
                    <div className='col-md-10'>

                        <Select
                            value={values.paid}
                            size='large'
                            style={{ width: '100%' }}
                            onChange={(v) => {


                                console.log(v)


                                setValues({ ...values, paid: v, price: 0 })
                            }

                            }

                        >
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>


                        </Select>
                    </div>




                    {values.paid && (
                        <div className="col-md-2">

                            <Select defaultValue='9.99'
                                style={{ width: '100%' }}
                                onChange={v => {
                                    console.log(v)


                                    setValues({ ...values, price: v })
                                }}
                                tokenSeparators={[,]}
                                size='large'
                            >
                                {children}

                            </Select>
                        </div>
                    )}
                </div>
            </div>
            <div className='form-group m-2,pt-3'>
                <input type='text'

                    name='catagory'
                    className='form-control '
                    placeholder='Catagory '
                    value={values.catagory}
                    onChange={handlechange}

                />
            </div>

            <div className='form-row row'>
                <div className='col-md-6'>
                    <div className='form-group'>
                        <label className='btn btn-outline-secondary btn-block text-left'>
                            {values.loading ? 'Uploading' : "imaage  upload"}
                            <input

                                type='file'
                                name='image'
                                onChange={handleImage}
                                accept="image/*"
                                hidden

                            />

                        </label>

                    </div>

                </div>
                {preview && (
                    <div className="col-md-6">

                        <Badge className="pointer" count="X" onClick={handleImageRemove}>

                            <Avatar width={200} src={preview} />
                        </Badge>

                    </div>
                )}

                <div className="col-md-6">

                    <Badge className="pointer" count="X" onClick={() => setValues({ ...values, image: '' })}>

                        <Avatar width={200} src={values.image} />
                    </Badge>

                </div>



            </div>
            <div className='form-group'>

                <div className='row'>
                    <div className='col'>
                        <Button
                            onClick={handleSubmit}
                            disabled={values.loading || values.uploading}
                            className='btn btn-primary'
                            icon={<SaveOutlined />}

                            type="primary"
                            size='large'
                            shape='round'

                        >
                            {values.loading ? "Saving.." : "save and continue"}

                        </Button>

                    </div>


                </div>

            </div>

        </form>

    </>
}
export default CourceEditForm;