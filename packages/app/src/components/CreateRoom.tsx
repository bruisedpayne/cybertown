import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  createRoomInputSchema,
  CreateRoomInput,
} from '@cybertown/core/room/input'
import { createRoomFn } from '@/lib/actions/room'
import { useForm } from '@tanstack/react-form'
import { FormFieldError } from './FormFieldError'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'

export function CreateRoom() {
  const [open, setOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      topic: '',
      size: 20,
      languages: [],
    } as CreateRoomInput,
    validators: {
      onChange: createRoomInputSchema,
    },
    onSubmit: async ({ value }) => createRoomMutation(value),
  })

  const { mutate: createRoomMutation, isPending } = useMutation({
    mutationFn: async (data: CreateRoomInput) => {
      return await createRoomFn({ data })
    },
    onSuccess: () => {
      setOpen(false)
    },
    onError: (err) => {
      let errMsg = 'Failed to create room. Try Again'
      if (err instanceof Error) {
        errMsg = err.message
      }
      toast.error(errMsg)
    },
  })

  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Room</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <DialogHeader className="mb-8">
            <DialogTitle>Create Room</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 mb-8">
            <form.Field
              name="topic"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    placeholder="Select topic"
                    autoComplete="off"
                    id="topic"
                    className="dark:bg-inherit"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FormFieldError meta={field.state.meta} />
                </div>
              )}
            />

            <form.Field
              name="size"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor="size">Size</Label>
                  <Select
                    name="size"
                    value={field.state.value.toString()}
                    onValueChange={(value) => field.handleChange(Number(value))}
                  >
                    <SelectTrigger className="w-full dark:bg-inherit">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomSizeOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormFieldError meta={field.state.meta} />
                </div>
              )}
            />

            <form.Field
              name="languages"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor="languages">Language</Label>
                  <MultiSelect
                    id="languages"
                    placeholder="Select language"
                    value={field.state.value}
                    options={roomLanguageOptions}
                    onValueChange={(value) => field.handleChange(value)}
                    hideSelectAll
                    defaultValue={field.state.value}
                  />
                  <FormFieldError meta={field.state.meta} />
                </div>
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2"
            >
              {isPending && <Spinner />}
              <span>Submit</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const roomSizeOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
]

const roomLanguageOptions = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'French', value: 'french' },
  { label: 'German', value: 'german' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Russian', value: 'russian' },
  { label: 'Portuguese', value: 'portuguese' },
  { label: 'Arabic', value: 'arabic' },
  { label: 'Hindi', value: 'hindi' },
]
