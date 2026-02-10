import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, db, googleProvider } from "@/lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"

export function AuthModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUserRole } = useAuth()

    // Form states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<"farmer" | "customer">("customer")
    const [name, setName] = useState("")

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user

            // Check if user exists in Firestore
            const userDocRef = doc(db, "users", user.uid)
            const userDoc = await getDoc(userDocRef)

            if (!userDoc.exists()) {
                // If new user, create with selected role (defaulting to customer if not explicitly selected in signup tab,
                // but here we are in a modal that might be in login or signup tab.
                // We'll use the 'role' state which defaults to 'customer' if they haven't touched it)
                await setDoc(userDocRef, {
                    name: user.displayName || "Unknown",
                    email: user.email,
                    role: role,
                    createdAt: new Date()
                })
                setUserRole(role)
                toast.success(`Account created as ${role}`)
            } else {
                const userData = userDoc.data()
                setUserRole(userData.role as "farmer" | "customer")
                toast.success("Logged in successfully")
            }

            setIsOpen(false)
            navigate("/app")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            // Role fetching is handled in AuthContext
            toast.success("Logged in successfully")
            setIsOpen(false)
            navigate("/app")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Save user role and details to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                role,
                createdAt: new Date()
            })

            setUserRole(role)
            toast.success("Account created successfully")
            setIsOpen(false)
            navigate("/app")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome to AgriLink</DialogTitle>
                    <DialogDescription>
                        Login or create an account to get started.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                                Google
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSignup} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">I am a</Label>
                                <Select value={role} onValueChange={(value: "farmer" | "customer") => setRole(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="farmer">Farmer</SelectItem>
                                        <SelectItem value="customer">Customer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                                Google
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
