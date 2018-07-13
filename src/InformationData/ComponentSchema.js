export default {
  condition: {
    else: {
      name: 'else',
      type: 'condition',
      comment: 'else',
      parameters: {
        
      }
    },
    break: {
      name: 'break',
      type: 'condition',
      comment: 'break',
      parameters: {
        
      }
    },
    checkVariable: {
      name: 'checkVariable',
      type: 'condition',
      comment: '입력한 Parameter와 값을 Option의 항목으로 비교한다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '입력',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '연산자',
          type: 'Selection',
          options: ['>', '>=', '==', '<', '<='],
          value: '==',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Number',
          comment: '대상',
          value: '',
          isRequired: 'true'
        },
      }
    },
    getOS: {
      name: 'getOS',
      type: 'condition',
      comment: '입력과 대상을 선택의 항목으로 비교',
      parameters: {
        option: {
          name: '연산자',
          type: 'Selection',
          options: ['==', '!='],
          value: '==',
          isRequired: 'true'
        },
        input1: {
          name: '입력',
          type: 'String',
          comment: '입력',
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          comment: '고정 값',
          value: '에이전트가 설치된 컴퓨터의 OS',
          isRequired: 'true'
        }
      }
    },
    getMemory: {
      name: 'getMemory',
      type: 'condition',
      comment: '입력과 대상을 선택의 항목으로 비교',
      parameters: {
        option: {
          name: '연산자',
          type: 'Selection',
          options: ['>', '>=', '==', '<', '<='],
          value: '==',
          isRequired: 'true'
        },
        input1: {
          name: '입력',
          type: 'Number',
          comment: '입력',
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          comment: '고정 값',
          value: '에이전트가 설치된 컴퓨터의 Memory',
          isRequired: 'true'
        },
      }
    },
    getRegistryValue: {
      name: 'getRegistryValue',
      type: 'condition',
      comment: '입력과 대상을 선택의 항목으로 비교',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '레지스트리의 값',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '연산자',
          type: 'Selection',
          options: ['>', '>=', '==', '<', '<='],
          value: '==',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'String',
          comment: '레지스트리의 경로',
          value: '',
          isRequired: 'true'
        },
      }
    },
    isAppRunning: {
      name: 'isAppRunning',
      type: 'condition',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '어플리케이션 이름',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['true', 'false'],
          value: 'false',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          comment: '고정 값',
          value: '',
          value: '에이전트가 설치된 컴퓨터에서 실행 중인 어플리케이션 중'
        },
      }
    },
    isServiceRunning: {
      name: 'isServiceRunning',
      type: 'condition',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '서비스 이름',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['true', 'false'],
          value: 'false',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          comment: '고정 값',
          value: '에이전트가 설치된 컴퓨터에서 실행 준인 서비스 중',
          isRequired: 'ture'
        },
      }
    },
    isUserActive: {
      name: 'isUserActive',
      type: 'condition',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        input1: {
          type: 'Null'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['true', 'false'],
          value: 'false',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터의 현재 사용자',
          comment: '고정 값'
        },
      }
    },
    // TODO: 
    isUserLoggedIn: {
      name: 'isUserLoggedIn',
      type: 'condition',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '사용자의 이름',
          value: '',
          isRequired: 'false'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['true', 'false'],
          value: 'false',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터의 현재 사용자',
          comment: '고정 값'
        },
      }
    },
    isThere: {
      name: 'isThere',
      type: 'condition',
      comment: '입력과 대상을 선택의 항목으로 비교',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '대상의 이름(확장자 포함)',
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'String',
          comment: '대상의 경로',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['true', 'false'],
          value: 'false',
          isRequired: 'true'
        }
      }
    },
    getMemoryStatus: {
      name: 'getMemoryStatus',
      type: 'condition',
      loop: 'true',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        option: {
          name: '선택',
          type: 'Selection',
          options: ['>', '>=', '==', '<', '<='],
          value: '==',
          isRequired: 'true'
        },
        input1: {
          name: '입력',
          type: 'Number',
          comment: '단위 : %',
          range: [0, 100],
          value: '0',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터의 메모리 사용률',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    },
    getNetworkInStatus: {
      name: 'getNetworkInStatus',
      type: 'condition',
      loop: 'true',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        option: {
          name: '연산자',
          type: 'Selection',
          options: ['>', '>=', '==', '<', '<='],
          value: '==',
          isRequired: 'true'
        },
        input1: {
          name: '입력',
          type: 'Number',
          comment: '단위 : KB/초',
          value: '0',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터의 Network In Data의 크기',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    },
    getNetworkOutStatus: {
      name: 'getNetworkOutStatus',
      type: 'condition',
      loop: 'true',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        option: {
          name: '연산자',
          type: 'Selection',
          options: ['>', '>=', '==', '<', '<='],
          value: '==',
          isRequired: 'true'
        },
        input1: {
          name: '입력',
          type: 'Number',
          comment: '단위 : KB/초',
          value: '0',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터의 Network Out Data의 크기',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    },
    getCPUStatus: {
      name: 'getCPUStatus',
      type: 'condition',
      loop: 'true',
      comment: '입력과 대상의 실시간 값을 선택의 항목으로 비교',
      parameters: {
        option: {
          name: '연산자',
          type: 'Selection',
          options: ['>', '>=', '==', '<', '<='],
          value: '==',
          isRequired: 'true'
        },
        input1: {
          name: '입력',
          type: 'Number',
          comment: '단위 : %',
          range: [0, 100],
          value: '0',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터의 현재 CPU 사용률',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    }
  },
  install: {
    installMSI: {
      name: 'installMSI',
      type: 'install',
      comment: '.msi 파일을 설치',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '설치할 파일의 전체 경로를 입력해주세요.',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Message',
          comment: '경고문의 내용을 입력할 수 있는 새 창을 띄웁니다.',
          options: ['없음', '경고문 생성'],
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    },
    installPKG: {
      name: 'installPKG',
      type: 'install',
      comment: '.pkg/.mpkg 파일을 설치',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '설치할 파일의 전체 경로를 입력해주세요.',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Message',
          comment: '경고문의 내용을 입력할 수 있는 새 창을 띄웁니다.',
          options: ['없음', '경고문 생성'],
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터',
          comment: '고정 값',
          isRequired: 'true'
        }
      }
    }
  },
  system: {
    executeShellCommand: {
      name: 'executeShellCommand',
      type: 'system',
      comment: '입력된 Shell command를 대상 에이전트의 장치에 지정된 권한으로 실행합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: 'Shell Script Command',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['Windows', 'macOS', 'Others'],
          value: 'Windows',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    },
    executePowerShellCommand: {
      name: 'executePowerShellCommand',
      type: 'system',
      comment: '입력된 Power Shell command를 대상 에이전트의 장치에 지정된 권한으로 실행합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: 'Power Shell Script Command',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['Windows', 'macOS', 'Others'],
          value: 'Windows',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    },
    executeAutomator: {
      name: 'executeAutomator',
      type: 'system',
      comment: '선택된 Automator를 대상 에이전트의 장치에 지정된 권한으로 실행합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'Selection',
          options: [],
          comment: '기존에 생성되어 있는 Automator',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['Windows', 'macOS', 'Others'],
          value: 'Windows',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터',
          comment: '고정 값',
          isRequired: 'true'
        },
      }
    },
    reboot: {
      name: 'reboot',
      type: 'system',
      comment: '입력만큼의 시간 후에 시스템을 재시작 합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'Number',
          comment: '단위 : 초',
          value: '0',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Message',
          comment: '경고문의 내용을 입력할 수 있는 새 창을 띄웁니다.',
          options: ['없음', '경고문 생성'],
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          comment: '고정 값',
          value: '에이전트가 설치된 컴퓨터',
          isRequired: 'false'
        },
      }
    },
    shutdown: {
      name: 'shutdown',
      type: 'system',
      comment: '입력만큼의 시간 후에 시스템을 종료 합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'Number',
          comment: '단위 : 초',
          value: '0',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Message',
          comment: '경고문의 내용을 입력할 수 있는 새 창을 띄웁니다.',
          options: ['없음', '경고문 생성'],
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          comment: '고정 값',
          value: '에이전트가 설치된 컴퓨터',
          isRequired: 'false'
        },
      }
    },
    sleep: {
      name: 'sleep',
      type: 'system',
      comment: '입력만큼의 시간 후에 시스템을 절전 모드로 합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'Number',
          comment: '단위 : 초',
          value: '0',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Message',
          comment: '경고문의 내용을 입력할 수 있는 새 창을 띄웁니다.',
          options: ['없음', '경고문 생성'],
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          comment: '고정 값',
          value: '에이전트가 설치된 컴퓨터',
          isRequired: 'false'
        },
      }
    },
    sendMessage: {
      name: 'sendMessage',
      type: 'system',
      comment: '메세지를 보냅니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '메시지의 내용을 입력합니다.',
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터',
          comment: '고정 값'
        },
        option: {
          type: 'Null'
        }
      }
    },
    sendEmail: {
      name: 'sendEmail',
      type: 'system',
      comment: '메일을 보냅니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '메일의 내용',
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'String',
          comment: '받을 사람의 주소(\',\'로 구분하여 여러명에게 전송)',
          value: '',
          isRequired: 'true'
        },
        option: {
          type: 'Null'
        }
      }
    },
    createLocalUser: {
      name: 'createLocalUser',
      type: 'system',
      comment: '로컬 사용자를 생성 합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '사용자의 이름',
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '입력',
          type: 'String',
          comment: '사용자의 비밀번호',
          value: '',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['admin', 'user'],
          value: 'user',
          isRequired: 'true'
        }
      }
    },
    deleteLocalUser: {
      name: 'deleteLocalUser',
      type: 'system',
      comment: '로컬 사용자를 삭제 합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '사용자의 이름',
          value: '',
          isRequired: 'true'
        },
        input2: {
          name: '대상',
          type: 'Fixed',
          value: '에이전트가 설치된 컴퓨터',
          comment: '고정 값',
          isRequired: 'true'
        },
        option: {
          type: 'Null'
        }
      }
    },
    logoffCurrentUser: {
      name: 'logoffCurrentUser',
      type: 'system',
      comment: '현재 사용자를 로그아웃 시킵니다. 지정 사용자가 없을 경우 전체 계정에 적용합니다.',
      parameters: {
        input1: {
          name: '입력',
          type: 'String',
          comment: '지정 사용자',
          value: '',
          isRequired: 'false'
        },
        input2: {
          name: '입력',
          type: 'Number',
          comment: '단위 : 초',
          value: '0',
          isRequired: 'true'
        },
        option: {
          name: '선택',
          type: 'Selection',
          options: ['없음', '경고문 생성'],
          value: '',
          isRequired: 'true'
        }
      }
    }
  }
};
