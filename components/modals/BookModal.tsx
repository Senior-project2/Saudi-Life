"use client"
import Modal from "./Modal"
import useBookModal from "@/app/hooks/onBookModal"
import {useState, useMemo, useEffect} from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../CategoryInput"
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form"
import CitySelect from "../CitySelect"
import dynamic from "next/dynamic"
import Counter from "../Counter"
import ImageUpload from "../ImageUpload"
import Input from "../Input"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import axios from "axios"



enum STEPS{
    CATEGORY=0,
    LOCATION =1,
    INFO =2,
    IMAGES =3,
    DESCRIPTION=4,
    PRICE=5,
    DATE=6
}
export const BookModal =   () => {
    const router = useRouter()
    const bookModal = useBookModal()
    const [step, setStep] = useState(STEPS.CATEGORY)
    const[isLoading, setIsLoading] = useState(false)
    
    const onNext = async () => {
        setStep((value) => value +1)
    }
    const onBack = () => {
        setStep((value) => value -1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.DATE){ 
        return onNext()
        }
        
         setIsLoading(true)

         axios.post('/api/listings', data)
         .then(()=>{
            toast.success('Activity created successfully')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY);
            bookModal.onClose()
         })
         .catch(() =>{
            toast.error("Somthing went wrong!")
         })
         .finally(() =>{
            setIsLoading(false)
         })
    }

    const actionLabel = useMemo(()=> {
        if(step === STEPS.DATE){
            return 'create';

        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(()=> {
        if(step === STEPS.CATEGORY){
            return undefined;

        }
        return 'Back'
    },[step])

    const{
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch,
        reset,
    
    } = useForm<FieldValues>({
        
        defaultValues: {
            category: '',
            location: null,
            guestCount:1,
            imageSrc:'',
            price:0,
            title: '',
            description: '',
            activityDate: ''
    }});

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const imageSrc = watch('imageSrc');
    

    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), [location]);

    const setCustomValue = (id: string, value:any) => {
        setValue(id, value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    let bodyContent = (
        <div className="flex
        flex-col
        gap-8">
            <Heading
            title="Which theme best describes your activity?"
            subtitle="Pick a category"/>

            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto">

                {categories.map((item) =>(
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                        onClick={(category) =>setCustomValue('category', category)}
                        selected={category === item.label}
                        label={item.label}
                        icon={item.icon}
                        />
                        </div>
                ))}
            </div>
        </div>

    )
    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className=" 
            flex 
            flex-col
            gap-8">
                <Heading
                title="Please enter nearest location on the map"
                subtitle="This is where tourists find you."
                />
                <CitySelect
                value={location}
                onChange={(value) => setCustomValue('location', value)}
                />
                  <Map
                  center={location?.latlng}
                  />
                
                
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className=" 
            flex 
            flex-col
            gap-8">
                <Heading
                title="Share more information about your activity"
                subtitle="This is where tourists find you."
                />
                <Counter
                title="Number of Guests"
                subtitle="How many guests can you bring?"
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)}
                />
             
                
            </div>
        )
    }

    if(step === STEPS.IMAGES){
        bodyContent = (
            <div>
                <Heading
                title="Please provide images to your activity"
                subtitle="Show tourists what your activity looks like!"/>
                <ImageUpload
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc', value)}
                
                />
            </div>
            
        )

    }

    if(step === STEPS.DESCRIPTION){
bodyContent = (
    <div className="
    flex
    flex-col
    gap-8
    ">
        <Heading
        title="Describe your activity"
        subtitle="Enter as much details as possible"
        />
        <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <hr/>
        <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />


    </div>
)

    }

    if(step === STEPS.PRICE){
        bodyContent = (
            <div className="
            flex
            flex-col
            gap-8
            ">
            <Heading
            title="Set your price"
            subtitle="How much do you want to charge?"
            />
            <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            </div>
        )
    }
    if (step === STEPS.DATE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Choose the date for your activity" subtitle="Select a date" />
            <input
              type="date"
              id="activityDate"
              disabled={isLoading}
              {...register('activityDate', { required: true })}
            />
            
          </div>
        );
      }
    
      useEffect(() => {
        console.log(errors);
    }, [errors]);
  return (
    <Modal
    title="Saudi Life"
    isOpen={bookModal.isOpen}
    onClose={bookModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    body={bodyContent}
    />
    
  )
}
