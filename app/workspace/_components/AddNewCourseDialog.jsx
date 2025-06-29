import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Description } from '@radix-ui/react-dialog'

function AddNewCourseDialog({ children }) {

    const [formData, setFomData] = useState({
        name: '',
        description: '',
        includeVideo: false,
        noOfChapter: 1,
        category: '',
        level: ''
    });

    const onHandleInputChange = (feild, value) => {
        setFomData(prev => ({
            ...prev,
            [feild]: value
        }))
        console.log(formData);

    }

    const onGenerate = () => {
        console.log(formData);
    }

    return (
        <Dialog>
            <DialogTrigger asChild >{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Course Using AI</DialogTitle>
                    <DialogDescription asChild>
                        <div className='flex flex-col gap-3 mt-3'>
                            <div>
                                <label>Course Name</label>
                                <Input placeholder="Course Name"
                                    onChange={(event) => onHandleInputChange('name', event?.target.value)} />
                            </div>
                            <div>
                                <label>Course Description (Optional)</label>
                                <Textarea placeholder="Course Description "
                                    onChange={(event) => onHandleInputChange('description', event?.target.value)} />
                            </div>
                            <div>
                                <label>No. of Chapters</label>
                                <Input placeholder="No of chapters" type="number"
                                    onChange={(event) => onHandleInputChange('noOfChapter', event?.target.value)} />
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label>Include Video</label>
                                <Switch
                                    onCheckedChange={() => onHandleInputChange('includeVideo', !formData?.includeVideo)}
                                />
                            </div>
                            <div>
                                <label >Difficulty Level</label>
                                <Select onValueChange={(value) => onHandleInputChange('level', value)} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficulty Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label>Category</label>
                                <Input placeholder="Category (Seprated by Comma)"
                                    onChange={(event) => onHandleInputChange('category', event?.target.value)} />
                            </div>
                            <div className='mt-5'>
                                <Button className={"w-full"} onClick={onGenerate} ><Sparkle /> Generate Course</Button>
                            </div>

                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewCourseDialog