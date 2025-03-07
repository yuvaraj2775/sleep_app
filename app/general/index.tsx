"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native"
import { MaterialCommunityIcons, Ionicons, FontAwesome5, Feather } from "@expo/vector-icons"
import CompletionAnimation from "../completion-animation"
import SignUpScreen from "../signup"
import { question } from '../../data'

type AgeGroup = "teen" | "young-adult" | "working" | "elderly" | null

type Question = {
  id: number
  question: string
  options: string[]
  key: string
  icon: React.ReactNode
}

export default function App() {
  const [answers, setAnswers] = useState({
    name: "",
    gender: "",
    age: "",
    ageGroup: null as AgeGroup,
    purpose: "",
    sleepSchedule: "",
    substances: "",
    gadgets: "",
    lighting: "",
    naps: "",
    pets: "",
    // Age-specific questions
    workStress: "",
    travelHabits: "",
    dayTimeSleepiness: "",
    irregularSleep: "",
    nightWaking: "",
    sleepFears: "",
    lateNightGaming: "",
    lateNightConversations: "",
    midnightOutings: "",
    nightExercise: "",
    depression: "",
    medications: "",
    restfulness: "",
    nightRoutine: "",
    jointPains: "",
    eveningActivity: "",
    // Teen-specific questions
    bedtime: "",
    refreshed: "",
    screenTime: "",
    stressAnxiety: "",
    homework: "",
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const determineAgeGroup = (age: number): AgeGroup => {
    if (age >= 12 && age <= 18) return "teen"
    if (age > 18 && age <= 25) return "young-adult"
    if (age > 25 && age <= 50) return "working"
    if (age > 50) return "elderly"
    return null
  }

  const handleAgeSelection = (ageGroup: string) => {
    let ageGroupType: AgeGroup;
    switch (ageGroup) {
      case "12-18":
        ageGroupType = "teen";
        break;
      case "18-25":
        ageGroupType = "young-adult";
        break;
      case "25-50":
        ageGroupType = "working";
        break;
      case "50+":
        ageGroupType = "elderly";
        break;
      default:
        ageGroupType = null;
    }
    setAnswers({ ...answers, age: ageGroup, ageGroup: ageGroupType });
  }

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1)
    setSelectedOption(null)
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      
      // Set the selected option based on the previous question's answer
      const previousQuestionKey = getPreviousQuestionKey()
      if (previousQuestionKey) {
        setSelectedOption(answers[previousQuestionKey as keyof typeof answers] as string)
      }
    }
  }

  const getPreviousQuestionKey = (): string | null => {
    // This function determines which key in the answers object corresponds to the previous question
    switch (currentQuestion) {
      case 1: return "name"
      case 2: return "gender"
      case 3: return "age"
      case 4: return "purpose"
      case 5: return "sleepSchedule"
      case 6: return "substances"
      case 7: return "gadgets"
      case 8: return "lighting"
      case 9: return "naps"
      default:
        // For age-specific questions, we need to determine which one
        if (currentQuestion > 9) {
          const questions = getAgeSpecificQuestions()
          const questionIndex = currentQuestion - 10
          if (questionIndex >= 0 && questions[questionIndex]) {
            return questions[questionIndex].key
          }
        }
        return null
    }
  }

  const renderAgeOptions = () => {
    const ageGroups = ["12-18 years", "18-25 years", "25-50 years", "50+ years"];
    return (
      <View style={styles.ageContainer}>
        {ageGroups.map((ageGroup) => (
          <TouchableOpacity
            key={ageGroup}
            style={[
              styles.ageButton,
              answers.age === ageGroup && styles.ageButtonSelected
            ]}
            onPress={() => handleAgeSelection(ageGroup)}
          >
            <Text style={[
              styles.ageButtonText,
              answers.age === ageGroup && styles.ageButtonTextSelected
            ]}>
              {ageGroup}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const getAgeSpecificQuestions = (): Question[] => {
    const questions=question

    if (!answers.ageGroup || !questions[answers.ageGroup]) return []
    return questions[answers.ageGroup]
  }

  const renderAgeSpecificQuestions = () => {
    const questions = getAgeSpecificQuestions()
    if (questions.length === 0) return null

    // Adjust the index to get the correct question based on the current question number
    const questionIndex = currentQuestion - 9
    if (questionIndex < 0 || questionIndex >= questions.length) return null

    const currentQuestionData = questions[questionIndex]

    return (
      <View style={styles.questionContainer}>
                  <View style={styles.questionHeader}>
                  <Text style={styles.title}>Age-Specific Questions</Text>
                  </View>
        
        <View style={styles.questionWithIcon}>
          {currentQuestionData.icon}
          <Text style={styles.question}>{currentQuestionData.question}</Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {currentQuestionData.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton, 
                selectedOption === option && styles.optionButtonSelected
              ]}
              onPress={() => {
                setSelectedOption(option)
                setAnswers({ ...answers, [currentQuestionData.key]: option })
              }}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.progressIndicator}>
            {questions.map((q, index) => (
              <View 
                key={index} 
                style={[
                  styles.progressDot, 
                  index === questionIndex ? styles.progressDotActive : 
                  index < questionIndex ? styles.progressDotCompleted : null
                ]} 
              />
            ))}
          </View>

        </View>
        
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.nextButton, !selectedOption && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={!selectedOption}
          >
            <Text style={styles.buttonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const handlePurposeSelection = (purpose: string) => {
    setAnswers({ ...answers, purpose: purpose })
    setSelectedOption(null)
    handleNext()
  }

  const handleQuestionnaireComplete = () => {
    setShowCompletion(true)
  }

  const handleCompletionFinished = () => {
    setShowCompletion(false)
    setShowLogin(true)
  }

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 0:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>Let's tailor your journey to better sleep</Text>
            <Text style={styles.subtitle}>
              The Sleep Coach will use your answers to personalize your sleep and give better recommendations and tips.
            </Text>
            <View style={styles.questionWithIcon}>
              <Ionicons name="person-outline" size={24} color="#b388ff" />
              <Text style={styles.question}>What is your name?</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="My name is..."
              placeholderTextColor="#666"
              value={answers.name}
              onChangeText={(text) => setAnswers({ ...answers, name: text })}
            />
            <View style={styles.navigationButtons}>
              <View style={styles.placeholder} />
              <TouchableOpacity
                style={[styles.nextButton, !answers.name ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!answers.name}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 1:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>About You</Text>
            <Text style={styles.subtitle}>
              While healthy sleep principles remain the same, recommendations differ according to age due to biological
              and physiological differences.
            </Text>
            <View style={styles.questionWithIcon}>
              <Ionicons name="male-female-outline" size={24} color="#b388ff" />
              <Text style={styles.question}>Please choose your gender</Text>
            </View>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton, 
                  answers.gender === "Male" && styles.genderButtonSelected
                ]}
                onPress={() => {
                  setAnswers({ ...answers, gender: "Male" })
                  setSelectedOption("Male")
                }}
              >
                <Ionicons name="male-outline" size={24} color={answers.gender === "Male" ? "white" : "#aaa"} />
                <Text style={styles.genderButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton, 
                  answers.gender === "Female" && styles.genderButtonSelected
                ]}
                onPress={() => {
                  setAnswers({ ...answers, gender: "Female" })
                  setSelectedOption("Female")
                }}
              >
                <Ionicons name="female-outline" size={24} color={answers.gender === "Female" ? "white" : "#aaa"} />
                <Text style={styles.genderButtonText}>Female</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !answers.gender ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!answers.gender}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 2:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>About You</Text>
            <View style={styles.questionWithIcon}>
              <Ionicons name="calendar-outline" size={24} color="#b388ff" />
              <Text style={styles.question}>How old are you?</Text>
            </View>
            {renderAgeOptions()}
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !answers.age ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!answers.age}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 3:
        return (
          <View style={styles.questionContainer}>
            <View style={styles.questionWithIcon}>
              <Ionicons name="help-circle-outline" size={24} color="#b388ff" />
              <Text style={styles.title}>What's your purpose for the App?</Text>
            </View>
            <View style={styles.optionsContainer}>
              {[
                { text: "Know their sleep pattern", icon: <Ionicons name="analytics-outline" size={20} color="#aaa" /> },
                { text: "Fall asleep faster", icon: <MaterialCommunityIcons name="sleep" size={20} color="#aaa" /> },
                { text: "Make morning easier", icon: <Ionicons name="sunny-outline" size={20} color="#aaa" /> },
                { text: "Better sleep quality", icon: <MaterialCommunityIcons name="sleep-off" size={20} color="#aaa" /> }
              ].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton, 
                    selectedOption === option.text && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedOption(option.text)
                    setAnswers({ ...answers, purpose: option.text })
                  }}
                >
                  <View style={styles.optionWithIcon}>
                    {option.icon}
                    <Text style={[
                      styles.optionText,
                      selectedOption === option.text && styles.optionTextSelected
                    ]}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !selectedOption ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!selectedOption}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )
      case 4:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>Sleep Schedule</Text>
            <View style={styles.questionWithIcon}>
              <Ionicons name="time-outline" size={24} color="#b388ff" />
              <Text style={styles.question}>Which time do you usually go to sleep/wake up?</Text>
            </View>
            <View style={styles.optionsContainer}>
              {[
                { text: "Early sleeper (10pm-6am)", icon: <Ionicons name="sunny-outline" size={20} color="#aaa" /> },
                { text: "Night owl (1am-9am)", icon: <Feather name="moon" size={20} color="#aaa" /> },
                { text: "Irregular schedule", icon: <MaterialCommunityIcons name="calendar-clock" size={20} color="#aaa" /> },
                { text: "Shift worker", icon: <MaterialCommunityIcons name="clock-time-eight-outline" size={20} color="#aaa" /> }
              ].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton, 
                    selectedOption === option.text && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedOption(option.text)
                    setAnswers({ ...answers, sleepSchedule: option.text })
                  }}
                >
                  <View style={styles.optionWithIcon}>
                    {option.icon}
                    <Text style={[
                      styles.optionText,
                      selectedOption === option.text && styles.optionTextSelected
                    ]}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !selectedOption ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!selectedOption}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 5:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>Evening Habits</Text>
            <View style={styles.questionWithIcon}>
              <MaterialCommunityIcons name="glass-wine" size={24} color="#b388ff" />
              <Text style={styles.question}>Before bedtime, do you drink alcohol or caffeine?</Text>
            </View>
            <View style={styles.optionsContainer}>
              {[
                { text: "Yes, alcohol regularly", icon: <MaterialCommunityIcons name="glass-wine" size={20} color="#aaa" /> },
                { text: "Yes, caffeine regularly", icon: <MaterialCommunityIcons name="coffee" size={20} color="#aaa" /> },
                { text: "Both occasionally", icon: <MaterialCommunityIcons name="glass-cocktail" size={20} color="#aaa" /> },
                { text: "No, neither", icon: <MaterialCommunityIcons name="glass-water" size={20} color="#aaa" /> }
              ].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton, 
                    selectedOption === option.text && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedOption(option.text)
                    setAnswers({ ...answers, substances: option.text })
                  }}
                >
                  <View style={styles.optionWithIcon}>
                    {option.icon}
                    <Text style={[
                      styles.optionText,
                      selectedOption === option.text && styles.optionTextSelected
                    ]}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !selectedOption ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!selectedOption}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 6:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>Screen Time</Text>
            <View style={styles.questionWithIcon}>
              <MaterialCommunityIcons name="cellphone" size={24} color="#b388ff" />
              <Text style={styles.question}>Do you use gadgets before going to bed?</Text>
            </View>
            <View style={styles.optionsContainer}>
              {[
                { text: "Yes, for more than an hour", icon: <MaterialCommunityIcons name="cellphone" size={20} color="#aaa" /> },
                { text: "Yes, but less than 30 minutes", icon: <Ionicons name="time-outline" size={20} color="#aaa" /> },
                { text: "Only for reading/relaxing apps", icon: <Ionicons name="book-outline" size={20} color="#aaa" /> },
                { text: "No gadgets before bed", icon: <MaterialCommunityIcons name="cellphone-off" size={20} color="#aaa" /> }
              ].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton, 
                    selectedOption === option.text && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedOption(option.text)
                    setAnswers({ ...answers, gadgets: option.text })
                  }}
                >
                  <View style={styles.optionWithIcon}>
                    {option.icon}
                    <Text style={[
                      styles.optionText,
                      selectedOption === option.text && styles.optionTextSelected
                    ]}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !selectedOption ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!selectedOption}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 7:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>Bedroom Environment</Text>
            <View style={styles.questionWithIcon}>
              <Ionicons name="bulb-outline" size={24} color="#b388ff" />
              <Text style={styles.question}>Are there any problems with the lighting in your room?</Text>
            </View>
            <View style={styles.optionsContainer}>
              {[
                { text: "Too bright", icon: <Ionicons name="sunny" size={20} color="#aaa" /> },
                { text: "Street lights shine in", icon: <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#aaa" /> },
                { text: "Too dark to navigate", icon: <Ionicons name="moon-outline" size={20} color="#aaa" /> },
                { text: "No lighting issues", icon: <Ionicons name="checkmark-circle-outline" size={20} color="#aaa" /> }
              ].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton, 
                    selectedOption === option.text && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedOption(option.text)
                    setAnswers({ ...answers, lighting: option.text })
                  }}
                >
                  <View style={styles.optionWithIcon}>
                    {option.icon}
                    <Text style={[
                      styles.optionText,
                      selectedOption === option.text && styles.optionTextSelected
                    ]}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !selectedOption ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!selectedOption}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 8:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.title}>Daytime Habits</Text>
            <View style={styles.questionWithIcon}>
              <MaterialCommunityIcons name="sleep" size={24} color="#b388ff" />
              <Text style={styles.question}>Do you take naps during the morning/evening?</Text>
            </View>
            <View style={styles.optionsContainer}>
              {[
                { text: "Yes, daily morning naps", icon: <Ionicons name="sunny-outline" size={20} color="#aaa" /> },
                { text: "Yes, afternoon/evening naps", icon: <Feather name="sunset" size={20} color="#aaa" /> },
                { text: "Occasional naps only", icon: <MaterialCommunityIcons name="sleep" size={20} color="#aaa" /> },
                { text: "No naps at all", icon: <MaterialCommunityIcons name="sleep-off" size={20} color="#aaa" /> }
              ].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton, 
                    selectedOption === option.text && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedOption(option.text)
                    setAnswers({ ...answers, naps: option.text })
                  }}
                >
                  <View style={styles.optionWithIcon}>
                    {option.icon}
                    <Text style={[
                      styles.optionText,
                      selectedOption === option.text && styles.optionTextSelected
                    ]}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.nextButton, !selectedOption ? styles.buttonDisabled : null]}
                onPress={handleNext}
                disabled={!selectedOption}
              >
                <Text style={styles.buttonText}>Next</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )

      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        const ageSpecificContent = renderAgeSpecificQuestions()
        if (!ageSpecificContent) {
          handleQuestionnaireComplete()
          return null
        }
        return ageSpecificContent

      default:
        handleQuestionnaireComplete()
        return null
    }
  }

  if (showLogin) {
    return <SignUpScreen />
  }

  if (showCompletion) {
    return <CompletionAnimation onComplete={handleCompletionFinished} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderQuestion()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  genderContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
    justifyContent: "center",
  },
  ageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  genderButtonSelected: {
    backgroundColor: "#b388ff",
  },
  genderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  ageScroller: {
    marginTop: 20,
    marginBottom: 20,
  },
  ageButton: {
    height: 60,
    marginTop:10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  ageButtonSelected: {
    backgroundColor: "#b388ff",
  },
  ageButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  ageButtonTextSelected: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#121121",
    padding: 20,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  questionHeader: {
    marginBottom: 24,
  },
  progressIndicator: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
    marginTop: 12,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  progressDotActive: {
    backgroundColor: "#b388ff",
    width: 16,
  },
  progressDotCompleted: {
    backgroundColor: "rgba(179, 136, 255, 0.5)",
  },
  questionWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  optionWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 40,
    lineHeight: 22,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    flex: 1,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 16,
    color: "white",
    fontSize: 16,
    marginBottom: 20,
  },
  navigationButtons: {
    position: "absolute",
    bottom: 40,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: "#b388ff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minWidth: 120,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minWidth: 120,
  },
  placeholder: {
    width: 120,
  },
  buttonDisabled: {
    backgroundColor: "#6a5a8e",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  optionsContainer: {
    marginTop: 20,
    gap: 16,
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 8,
  },
  optionButtonSelected: {
    backgroundColor: "rgba(179, 136, 255, 0.3)",
    borderColor: "#b388ff",
    borderWidth: 1,
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  optionTextSelected: {
    color: "white",
    fontWeight: "600",
  },
  summaryText: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },
  summaryContainer: {
    maxHeight: 400,
    marginVertical: 20,
  },
})